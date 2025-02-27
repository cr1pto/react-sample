import { useAppDispatch } from "../../app/hooks"
import styles from "./IntegrationForm.module.css"
import {
  addNewIntegration,
  type IntegrationMetadata,
} from "../integrations/integrationsSlice"

//   {
//     "id": 4,
//     "name": "arjun.net",
//     "description": "this is a Junctions test",
//     "url": "https://bell.com",
//     "logo": "http://placeimg.com/640/480/cats",
//     "active": false
// }

interface AddIntegrationFormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement
  url: HTMLInputElement
  logo: HTMLInputElement
  active: HTMLInputElement
  description: HTMLTextAreaElement
}
interface AddIntegrationFormElements extends HTMLFormElement {
  readonly elements: AddIntegrationFormFields
}
export const AddIntegrationForm = () => {
  const dispatch = useAppDispatch()
  const handleSubmit = (e: React.FormEvent<AddIntegrationFormElements>) => {
    // Prevent server submission
    e.preventDefault()

    const { elements } = e.currentTarget

    const newIntegration: IntegrationMetadata = {
      id: undefined,
      name: elements.name.value,
      url: elements.url.value,
      logo: elements.logo.value,
      description: elements.description.value,
      active: Boolean(elements.active.value),
    }
    dispatch(addNewIntegration(newIntegration))
    // e.currentTarget.reset()
  }

  return (
    <section className={styles.section}>
      <h2>Add a New Integration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name of Integration:</label>
        <input type="text" id="name" defaultValue="" required />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          defaultValue=""
          required
        />
        <label htmlFor="url">Integration Url:</label>
        <input type="text" id="url" defaultValue="" required />
        <label htmlFor="logo">Integration Logo URL:</label>
        <input type="text" id="logo" defaultValue="" required />
        <input type="checkbox" id="active" defaultValue="" required />
        <label htmlFor="active">Activate Integration?</label>
        <button>Save Integration</button>
      </form>
    </section>
  )
}
