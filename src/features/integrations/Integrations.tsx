import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./Integrations.module.css"
import { getIntegrationsAsync, selectIntegrations } from "./integrationsSlice"

export const Integrations = () => {
  const dispatch = useAppDispatch()
  const integrations = useAppSelector(selectIntegrations)
  console.log("🚀 ~ Integrations ~ integrations:", integrations)

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
    </div>
  )
}
