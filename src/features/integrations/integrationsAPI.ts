import type { IntegrationMetadata } from "./integrationsSlice"

// A mock function to mimic making an async request for data
export const fetchIntegrations = () => {
  return fetch("http://localhost:8080/integrations")
    .then(res => res.json())
    .catch(err => {
      console.error(err)
      return { data: [] }
    })
  // return new Promise<{ data: IntegrationMetadata[] }>(resolve =>
  //   setTimeout(() => resolve({ data: integrations }), 500),
  // )
}

export const addIntegration = (integration: IntegrationMetadata) => {
  return fetch("http://localhost:8080/integrations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(integration),
  })
    .then(res => res.json())
    .catch(err => {
      console.error(err)
      return { data: [] }
    })
}

export const setIntegrationToInactive = (id: number) => {
  return fetch(
    `http://localhost:8080/integrations/${id}/active?state=${false}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ active: false }),
    },
  )
    .then(res => res.json())
    .catch(err => {
      console.error(err)
      return { data: [] }
    })
}
