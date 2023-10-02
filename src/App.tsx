import { LandingPage, Register, Login, Dashboard, Board } from "./features";
import {
  Route,
  Routes,
} from "react-router-dom";

function App() {


  return (
    <>
      <Routes>
        <Route path="/"
          element={<LandingPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/login"
          element={<Login />} />
        <Route path="/register"
          element={<Register />} />
        <Route path='dashboard/:boardId'
          element={<Board />} />
      </Routes>
    </>
  )

}

export default App
