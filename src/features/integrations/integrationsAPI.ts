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
