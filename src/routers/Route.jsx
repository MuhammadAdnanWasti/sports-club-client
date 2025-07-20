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
import MyProfile from "../pages/DashBoard/MyProfile";
import PendingBookings from "../pages/DashBoard/PendingBookings";
import PrivateRoute from "./PrivateRoute";
import DashBoardLayout from "../layouts/DashBoardLayout";
import ManageCourts from "../pages/DashBoard/ManageCourts";
import ManageAnnouncements from "../pages/DashBoard/ManageAnnouncements";
import ManageCoupons from "../pages/DashBoard/ManageCoupons";
import ManageBookingApprovals from "../pages/DashBoard/ManageBookingApprovals";
import ShowAnnouncement from "../pages/DashBoard/ShowAnnouncement";
import ApprovedBookingsPage from "../pages/DashBoard/ApprovedBookingsPage";
import ConfirmedBookingsPage from "../pages/DashBoard/ConfirmedBookingsPage";
import Payment from "../pages/DashBoard/strip/Payment";
import PaymentHistoryPage from "../pages/DashBoard/PaymentHistoryPage";

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
    path:'dashboard',
    element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children:[
      {path:'/dashboard',
        Component:MyProfile
      },
      {path:'myProfile',
        Component:MyProfile
      },
      {path:'pendingBookings',
        Component:PendingBookings
      },
      {path:'manageAnnouncements',
        Component:ManageAnnouncements
      },
      {path:'manageCourts',
        Component:ManageCourts
      },
      {path:'manageCoupons',
        Component:ManageCoupons
      },
      {path:'manageBookingApprovals',
        Component:ManageBookingApprovals
      },
      {path:'showAnnouncements',
        Component:ShowAnnouncement
      },
      {path:'approvedBookings',
        Component:ApprovedBookingsPage
      },
      {path:'confirmedBookings',
        Component:ConfirmedBookingsPage
      },
      {
        path: 'payment/:_id',
        Component:Payment
      },
      {
        path: 'paymentHistory',
        Component:PaymentHistoryPage
      },
    ]
  },
  
  {
    path: "/*",
    Component:NotFound
  }
]);

export default router