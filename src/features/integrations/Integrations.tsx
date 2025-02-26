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
  // console.log("🚀 ~ Integrations ~ integrations:", integrations)

  function getFilteredIntegrations() {
    dispatch(getIntegrationsAsync()).then(res => {
      console.log("🚀 ~ dispatch ~ res:", res)
      setIntegrationResults(res.payload)
    })
  }
  function processInactive(id: number) {
    dispatch(setIntegrationToInactiveAsync(id)).then(res => {
      getFilteredIntegrations()
    })
  }
  useEffect(() => {
    getFilteredIntegrations()
    let done = false
    return () => {
      done = true
      return
    }
  }, [dispatch])

  return (
    <div className={styles.container}>
      <h1>Integrations</h1>
      <div className={styles.row}>
        <div>Test</div>
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Get Integrations"
          onClick={() => getFilteredIntegrations()}
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
              <button className={styles.button} onClick={() => processInactive(integration.id)}>
                Set Inactive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
