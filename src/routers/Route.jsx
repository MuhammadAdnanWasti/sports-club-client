import {
  createBrowserRouter
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Courts from "../pages/Courts";
import Auth from "../layouts/Auth";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
        {index:true, Component:Home},
        {
            path:'courts',
            Component:Courts
        }
    ]
  },
   {
    path: "/auth",
    Component: Auth,
    children:[
      {
path:'/auth/login',
Component:Login
},
      {
path:'/auth/register',
Component: Register

}
    ]
  },
  
  {
    path: "/*",
    Component:NotFound
  }
]);

export default router