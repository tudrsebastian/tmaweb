import { LandingPage, Register, Login, Dashboard } from "./features";
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
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: 'boards/:boardId',
        element: <></>,
      },
    ]
  }
]);


function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )

}

export default App
