import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import Clients from "./pages/Clients.jsx";
import Welcome from "./pages/Welcome.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/clients",
    element: <Clients />
  },
  {
    path: "/welcome",
    element: <Welcome />
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
