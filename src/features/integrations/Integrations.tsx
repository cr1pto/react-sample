import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
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

  useEffect(() => {
    dispatch(getIntegrationsAsync()).then(res => {
      console.log("🚀 ~ dispatch ~ res:", res)
      setIntegrationResults(res.payload)
    })
    let done = false
    return () => {
      done = true
      return
    }
  }, [dispatch])

  return (
    <div>
      <h1>Integrations</h1>
      <div className={styles.row}>
        <div>Test</div>
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Get Integrations"
          onClick={() => dispatch(getIntegrationsAsync())}
        >
          Click to load integrations
        </button>
      </div>
      <div className={styles.row}>
        {integrationResults.map((integration: IntegrationMetadata) => (
          <div className={styles.card} key={integration.id}>
            <h3>{integration.name}</h3>
            <p>{integration.description}</p>
            <a href={integration.url} target="_blank" rel="noreferrer">
              {integration.url}
            </a>
            <button onClick={() => dispatch(setIntegrationToInactiveAsync(integration.id))}>
              Set Inactive
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
