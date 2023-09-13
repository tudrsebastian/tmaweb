import { LandingPage, Register, Login, Dashboard, Boards, Board } from "./features";
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
        <Route path='/boards'
          element={<Boards />} />
        <Route path='boards/:boardId'
          element={<Board />} />
      </Routes>
    </>
  )

}

export default App
