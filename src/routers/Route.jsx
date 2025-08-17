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
import ManageMembers from "../pages/DashBoard/ManageMembers";
import AllUsers from "../pages/DashBoard/AllUsers";
import AllConfirmedBooking from "../pages/DashBoard/AllConfirmedBooking";
import MemberRoute from "./MemberRoute";
import PaymentForm from "../pages/DashBoard/strip/PaymentForm";
import AdminRoute from "./AdminRoute";
import HelpSupport from "../pages/Help/HelpSupport";
import Overview from "../pages/DashBoard/Overview";

const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
        {index:true, Component:Home},
        {
            path:'courts',
            Component:Courts
        },
        {
            path:'helpSupport',
            Component:HelpSupport
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
      {path:'overview',
        Component:Overview
      },
      {path:'pendingBookings',
        Component:PendingBookings
      },
      {path:'manageAnnouncements',
        element:(<AdminRoute> 
          <ManageAnnouncements></ManageAnnouncements>
        </AdminRoute>)
      },
      {path:'manageCourts',
       element:(<AdminRoute> 
          <ManageCourts></ManageCourts>
        </AdminRoute>)
      },
      {path:'manageCoupons',
       element:(<AdminRoute> 
          <ManageCoupons></ManageCoupons>
        </AdminRoute>)
      },
      {path:'manageBookingApprovals',
       element:(<AdminRoute> 
          <ManageBookingApprovals></ManageBookingApprovals>
        </AdminRoute>)
      },
      {path:'showAnnouncements',
        Component:ShowAnnouncement
      },
      {path:'approvedBookings',
        element:(<MemberRoute>
          <ApprovedBookingsPage></ApprovedBookingsPage>
        </MemberRoute>)
      },
      {path:'confirmedBookings',
        element:(<MemberRoute>
        <ConfirmedBookingsPage></ConfirmedBookingsPage>
        </MemberRoute>)
      },
      {
        path: 'payment/:_id',
        element:(<MemberRoute>
        <Payment></Payment>
        </MemberRoute>)
      },
      {
        path: 'paymentHistory',
       element:(<MemberRoute>
          <PaymentHistoryPage></PaymentHistoryPage>
        </MemberRoute>)
      },
      {
        path: 'manageMembers',
       element:(<AdminRoute> 
          <ManageMembers></ManageMembers>
        </AdminRoute>)
      },
      {
        path: 'allUsers',
       element:(<AdminRoute> 
         <AllUsers></AllUsers>
        </AdminRoute>)
      },
      {
        path: 'allConfirmed',
       element:(<AdminRoute> 
          <AllConfirmedBooking></AllConfirmedBooking>
        </AdminRoute>)
      },
    ]
  },
  
  {
    path: "/*",
    Component:NotFound
  }
]);

export default router