import { NavLink, Outlet, Route, Routes } from "react-router"
import "./App.css"
import { Counter } from "./features/counter/Counter"
import { Quotes } from "./features/quotes/Quotes"
import { Integrations } from "./features/integrations/Integrations"
import { UsersFavoriteColors } from "./features/usersFavoriteColors/UsersFavoriteColors"
import { UserList } from "./features/usersFavoriteColors/UserList"

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          {/* <NavLink to="/counter">Counter</NavLink>
          <NavLink to="/quotes">Quotes</NavLink> */}
          <NavLink to="/">Home</NavLink>
          <NavLink to="/integrations">Integrations</NavLink>
          <NavLink to="/userList">User List</NavLink>
        </nav>
        <Routes>
          <Route path="counter" element={<Counter />} />
          <Route path="quotes" element={<Quotes />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="userList" element={<UserList />} />
          <Route path="" element={<UsersFavoriteColors />} />
        </Routes>
        <div>
          <Outlet />
        </div>
      </header>
    </div>
  )
}

export default App
