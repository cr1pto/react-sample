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

export const Integrations = () => {
  const dispatch = useAppDispatch()
  const integrations = useAppSelector(selectIntegrations)
  const [integrationResults, setIntegrationResults] = useState([])
  const [filteredIntegrations, setFilteredIntegrations] = useState([])
  const [isSearchDisabled, setIsSearchDisabled] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getFilteredIntegrations()
    let done = false
    return () => {
      done = true
      return
    }
  }, [dispatch])

  async function getFilteredIntegrations() {
    const response = await dispatch(getIntegrationsAsync())
    setIntegrationResults(response.payload)
  }
  async function toggleActive(id: number) {
    const response = await dispatch(toggleActiveStatusAsync(id))
    console.log("🚀 ~ processInactive ~ response:", response)
    await getFilteredIntegrations()
    // updateMetadata(response.payload)
    // setFilteredIntegrations(response.payload)
  }

  async function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
    setTimeout(() => {
      setIsSearchDisabled(searchTerm?.trim().length < 1)
      // console.log("🚀 ~ e.key:", searchTerm)
    }, 250)
  }

  async function handleClickFilter(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  ) {
    const response = await dispatch(filterByName(searchTerm))
    console.log("🚀 ~ Integrations ~ response:", response)
    updateMetadata(response.payload)
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
          {filteredIntegrations &&
            filteredIntegrations.map((integration: IntegrationMetadata) => (
              <div className={styles.row} key={uuidv4()}>
                <div className={styles.card} key={uuidv4()}>
                  <h3>{integration.name}</h3>
                  <p>{integration.description}</p>
                  <a href={integration.url} target="_blank" rel="noreferrer">
                    {integration.url}
                  </a>
                  <div className={styles.row}>
                    <input
                      type="checkbox"
                      checked={integration.active}
                      disabled
                    />
                    <label>Active</label>
                  </div>
                  <button
                    className={styles.button}
                    onClick={() => toggleActive(integration.id)}
                  >
                    Toggle Inactive
                  </button>
                </div>
              </div>
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
      <div className={styles.column}>
        {integrationResults.map((integration: IntegrationMetadata) => (
          <div className={styles.row} key={uuidv4()}>
            <div className={styles.card} key={uuidv4()}>
              <h3>{integration.name}</h3>
              <p>{integration.description}</p>
              <a href={integration.url} target="_blank" rel="noreferrer">
                {integration.url}
              </a>
              <div className={styles.row}>
                <input type="checkbox" checked={integration.active} disabled />
                <label>Active</label>
              </div>
              <button
                className={styles.button}
                onClick={() => toggleActive(integration.id)}
              >
                Toggle Inactive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
