
import {redirect} from "react-router-dom";
import {createBrowserRouter} from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Layout from "../pages/LayoutPage";
import Error from "../components/Error";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
    errorElement: <Error />,
    loader : () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/")
      }
      return null
    }
  },
  {
    path: "/register",
    element: <Register/>,
    errorElement: <Error />,
    loader : () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/login")
      }
      return null
    }
  },
    {
      element: <Layout/>,
    errorElement: <Error />,
      loader : () => {
        if (!localStorage.getItem("access_token")) {
          return redirect("/login")
        }
      
        return null
      },
      children : [
        {
          path: "/",
          element: <Dashboard/>,
        }
        
      ]
    },
   
   
]);



export default router;