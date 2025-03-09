import { Link } from "react-router"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./UsersFavoriteColors.module.css"
import type { UserWithColorInfo } from "./usersFavoriteColorsSlice"
import { deleteUser, selectUsers } from "./usersFavoriteColorsSlice"
import { v4 as uuidv4 } from "uuid"

export const UserList = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers)
  console.log("🚀 ~ UserList ~ users:", users)

  function getColor(user: UserWithColorInfo): string | undefined {
    console.log("🚀 ~ getColor ~ user:", user)
    if (styles[user?.favoriteColorName?.toLocaleLowerCase()] === undefined) {
      return styles["default-color"]
    }

    return styles[user.favoriteColorName.toLocaleLowerCase()]
  }

  return (
    <>
      <div className={styles.listItemContainer}>
        {!users?.length && <div>No users.</div>}
        {users &&
          users.map(c => {
            return (
              <div className={styles.listItem}>
                <div key={uuidv4()} className={getColor(c)}>
                  <div className={styles.listItemText}>{c.name}</div>
                  <button
                    className={styles.listItemButton}
                    onClick={e => dispatch(deleteUser(c))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
      </div>
      <div className={styles.end}>
        <Link to="/">Add New User With Color</Link>
      </div>
    </>
  )
}
