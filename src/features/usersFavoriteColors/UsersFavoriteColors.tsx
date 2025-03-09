import type { ChangeEvent } from "react"
import type React from "react"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import type { UserWithColorInfo } from "./usersFavoriteColorsSlice"
import { addUser, selectColors } from "./usersFavoriteColorsSlice"
import { Link } from "react-router"

interface AddUserFavoriteColorFields extends HTMLFormControlsCollection {
  user: HTMLInputElement
  favoriteColorName: HTMLInputElement
}
interface AddUserFavoriteColorElements extends HTMLFormElement {
  readonly elements: AddUserFavoriteColorFields
}

export const UsersFavoriteColors = () => {
  const dispatch = useAppDispatch()
  const [userName, setUserName] = useState("")
  const colors = useAppSelector(selectColors)
  const [selectedColor, setSelectedColor] = useState(colors[0])
  async function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setUserName(event.target.value)
  }

  const handleSubmit = (e: React.FormEvent<AddUserFavoriteColorElements>) => {
    // Prevent server submission
    e.preventDefault()

    const { elements } = e.currentTarget

    const addNewUserColor: UserWithColorInfo = {
      favoriteColorHexValue: elements.favoriteColorName.value,
      favoriteColorName: elements.favoriteColorName.value,
      name: elements.user.value,
    }
    dispatch(addUser(addNewUserColor))
    setUserName("")
    setSelectedColor("")
    e.currentTarget.reset()
  }

  function handleItemsChanged(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedColor(selectedColor)
  }

  return (
    <>
      <div>
        <h1>Add Color</h1>

        <form onSubmit={handleSubmit}>
          <input name="user" value={userName} onChange={handleOnChange} />
          <select name="favoriteColorName" onChange={handleItemsChanged}>
            {colors &&
              colors.map(c => {
                return <option key={c}>{c}</option>
              })}
          </select>
          <button>Submit</button>
        </form>
        <Link to="/userList">View User List</Link>
      </div>
    </>
  )
}
