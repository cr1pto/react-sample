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
export const fetchIntegrationById = (id: number) => {
  return fetch("http://localhost:8080/integrations/" + id)
    .then(res => res.json())
    .catch(err => {
      console.error(err)
      return { data: undefined }
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

export const toggleActiveStatus = (id: number, active: boolean) => {
  return fetch(
    `http://localhost:8080/integrations/${id}/active?state=${active}`,
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
export const filterIntegrationByName = (name: string) => {
  return fetch(
    `http://localhost:8080/searchIntegrations?descriptionText=${name}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
    .then(res => {
      console.log("🚀 ~ filterIntegrationByName ~ res:", res)
      return res.json()
    })
    .catch(err => {
      console.error(err)
      return { data: [] }
    })
}
