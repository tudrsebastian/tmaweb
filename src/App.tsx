import { LandingPage, Register, Login } from "./features";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);


function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )

}

export default App
