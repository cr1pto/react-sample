import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./UsersFavoriteColors.module.css"
import { deleteUser, selectUsers } from "./usersFavoriteColorsSlice"
import { v4 as uuidv4 } from "uuid"

export const UserList = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers)
  console.log("🚀 ~ UserList ~ users:", users)

  return (
    <>
      <div className={styles.container}></div>
      {!users?.length && <div>No users.</div>}
      {users &&
        users.map(c => {
          return (
            <div key={uuidv4()} className={styles.container}>
              <div>
                <div>{c.name}</div>
                <button onClick={e => dispatch(deleteUser(c))}>Delete</button>
              </div>
            </div>
          )
        })}
    </>
  )
}
