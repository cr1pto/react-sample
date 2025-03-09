import type { ChangeEvent } from "react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { v4 as uuidv4 } from "uuid"
import styles from "./Integrations.module.css"
import type { IntegrationMetadata } from "./integrationsSlice"
import {
  filterByName,
  getIntegrationsAsync,
  selectIntegrations,
  toggleActiveStatusAsync,
  updateMetadata,
} from "./integrationsSlice"
import { IntegrationDetail } from "../integrationDetails/integrationDetails"
import { AddIntegrationForm } from "../integrationForm/IntegrationForm"

export const Integrations = () => {
  const dispatch = useAppDispatch()
  const integrations = useAppSelector(selectIntegrations)
  const [integrationResults, setIntegrationResults] = useState(integrations)
  const [filteredIntegrations, setFilteredIntegrations] = useState(integrations)
  const [isSearchDisabled, setIsSearchDisabled] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  async function getFilteredIntegrations() {
    const response = await dispatch(getIntegrationsAsync())
    console.log(response)
    setIntegrationResults(response.payload as IntegrationMetadata[])
  }
  async function toggleActive(id: number) {
    const response = await dispatch(toggleActiveStatusAsync(id))
    console.log("🚀 ~ processInactive ~ response:", response)
    await getFilteredIntegrations()
  }

  async function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
    setTimeout(() => {
      setIsSearchDisabled(searchTerm?.trim().length < 1)
    }, 250)
  }

  async function handleClickFilter(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  ) {
    const response = await dispatch(filterByName(searchTerm))
    dispatch(updateMetadata(response.payload))
    setFilteredIntegrations(response.payload)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleClickFilter(null)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Integrations</h1>
      <div className={styles.row}>
        <div>
          <AddIntegrationForm />
        </div>
        <div>
          <h2>Search for an integration</h2>
          <div>
            <input
              className={styles.input}
              type="text"
              placeholder="Search for integration..."
              aria-label="Search for an integration"
              value={searchTerm}
              onKeyDown={e => handleKeyDown(e)}
              onChange={handleOnChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <button
          disabled={isSearchDisabled}
          className={isSearchDisabled ? styles.disabledButton : styles.button}
          aria-label="Get Integrations"
          onClick={handleClickFilter}
        >
          Search
        </button>
        <div>
          <div>
            <h3>Total Filtered Integrations: {filteredIntegrations.length}</h3>
          </div>
          {filteredIntegrations &&
            filteredIntegrations.map((integration: IntegrationMetadata) => (
              <IntegrationDetail data={integration} key={uuidv4()} />
            ))}
        </div>
      </div>
      <hr />
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Filter Integrations"
          onClick={getFilteredIntegrations}
        >
          Refresh Integrations
        </button>
      </div>
      <div>
        <h3>Total Integrations: {integrationResults.length}</h3>
      </div>
      <div className={styles.column}>
        {integrationResults.map((integration: IntegrationMetadata) => (
          <IntegrationDetail data={integration} key={uuidv4()} />
        ))}
      </div>
    </div>
  )
}
