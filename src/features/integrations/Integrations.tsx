import type { ChangeEvent, MouseEventHandler } from "react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { v4 as uuidv4 } from "uuid"
import styles from "./Integrations.module.css"
import type { IntegrationMetadata } from "./integrationsSlice"
import {
  getIntegrationsAsync,
  selectIntegrations,
  setIntegrationToInactiveAsync,
} from "./integrationsSlice"

export const Integrations = () => {
  const dispatch = useAppDispatch()
  const integrations = useAppSelector(selectIntegrations)
  const [integrationResults, setIntegrationResults] = useState([])
  const [filteredIntegrations, setFilteredIntegrations] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  async function getFilteredIntegrations() {
    const response = await dispatch(getIntegrationsAsync())
    setIntegrationResults(response.payload)
  }
  async function processInactive(id: number) {
    await dispatch(setIntegrationToInactiveAsync(id))
    getFilteredIntegrations()
  }
  useEffect(() => {
    getFilteredIntegrations()
    let done = false
    return () => {
      done = true
      return
    }
  }, [dispatch])

  async function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
    setTimeout(() => {
      console.log("🚀 ~ e.key:", searchTerm)
    }, 500)
    // getFilteredIntegrations()
  }

  async function handleClickFilter(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    console.log("🚀 ~ Integrations ~ event:", event)
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
              placeholder="Search..."
              aria-label="Search for an integration"
              value={searchTerm}
              onChange={handleOnChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Get Integrations"
          onClick={getFilteredIntegrations}
        >
          Refresh Integrations
        </button>
      </div>
      <hr />
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Filter Integrations"
          onClick={e => handleClickFilter(e)}
        >
          Click to load integrations
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
              <button
                className={styles.button}
                onClick={() => processInactive(integration.id)}
              >
                Set Inactive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
