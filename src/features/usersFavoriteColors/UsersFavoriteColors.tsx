import type { ChangeEvent } from "react"
import type React from "react"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./UsersFavoriteColors.module.css"
import type { UserWithColorInfo } from "./usersFavoriteColorsSlice"
import { addUser, selectColors, selectUsers } from "./usersFavoriteColorsSlice"

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
  // const users = useAppSelector(selectUsers)
  // console.log("🚀 ~ UsersFavoriteColors ~ users:", users)

  async function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setUserName(event.target.value)
  }

  const handleSubmit = (e: React.FormEvent<AddUserFavoriteColorElements>) => {
    console.log("🚀 ~ handleSubmit ~ e:", e)
    // Prevent server submission
    e.preventDefault()

    const { elements } = e.currentTarget

    const addNewUserColor: UserWithColorInfo = {
      favoriteColorHexValue: elements.favoriteColorName.value,
      favoriteColorName: elements.favoriteColorName.value,
      name: elements.user.value,
    }
    console.log("🚀 ~ handleSubmit ~ addNewUserColor:", addNewUserColor)
    dispatch(addUser(addNewUserColor))
    setUserName("")
    setSelectedColor("")
    e.currentTarget.reset()
  }

  function handleItemsChanged(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedColor(selectedColor)
  }

  function getColor(): string | undefined {
    if (styles[selectedColor] === undefined) {
      return styles.gray
    }

    return styles[selectedColor]
  }

  return (
    <>
      <div className={getColor()}>
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
        <a href="/userList">View User List</a>
      </div>
    </>
  )
}
