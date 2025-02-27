import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./IntegrationDetails.module.css"
import {
  selectIntegrations,
  toggleActiveStatusAsync,
  type IntegrationMetadata,
} from "../integrations/integrationsSlice"

export interface IntegrationDetailProps {
  data: IntegrationMetadata
}

//can pass by props or read from store
export const IntegrationDetail = (props: IntegrationDetailProps) => {
  const dispatch = useAppDispatch()
  const integrations = useAppSelector(selectIntegrations)

  const foundIntegrations = integrations.filter(i => i.id === props.data.id)

  const selectedIntegration = foundIntegrations[0] ?? undefined

  if (!selectedIntegration) return <></>

  return (
    <div className={styles.row}>
      <div className={styles.card}>
        <h3>{selectedIntegration.name}</h3>
        <p>{selectedIntegration.description}</p>
        <a href={selectedIntegration.url} target="_blank" rel="noreferrer">
          {selectedIntegration.url}
        </a>
        <div className={styles.row}>
          <input
            type="checkbox"
            checked={selectedIntegration.active}
            disabled
          />
          <label>Active</label>
        </div>
        <button
          className={styles.button}
          onClick={() =>
            dispatch(toggleActiveStatusAsync(selectedIntegration.id ?? 0))
          }
        >
          Toggle Inactive
        </button>
      </div>
    </div>
  )
}
