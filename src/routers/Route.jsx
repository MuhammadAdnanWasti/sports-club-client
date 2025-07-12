import {
  createBrowserRouter
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Courts from "../pages/Courts";

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
]);

export default router