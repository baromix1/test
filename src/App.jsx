import { Box, CssBaseline, Typography } from "@mui/material";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import { useContext, useEffect } from "react";
import AuthContext from "./store/auth-context";
import WallPage from "./pages/WallPage";
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";
import OfferPage from "./pages/OfferPage";
import Appbar from "./components/UI/Appbar";
import ProfilePage from "./pages/ProfilePage";
import TransactionsHistoryPage from "./pages/TransactionsHistoryPage";
import CreateOfferPage from "./pages/CreateOfferPage";
import AdminPage from "./pages/AdminPage";
import SuperAdminPage from "./pages/SuperAdminPage";
import CreateUserForm from "./components/adminPage/CreateUserForm";
import DeleteUserForm from "./components/adminPage/DeleteUserForm";
import RemoveFromCommForm from "./components/adminPage/RemoveFromCommForm";
import AddUserForm from "./components/adminPage/AddUserForm";
import AllUsers from "./components/adminPage/AllUsers";
import AddUserToCommunityForm from "./components/superAdminPage/AddUserToCommunityForm";
import DeleteCommunityForm from "./components/superAdminPage/DeleteCommunityForm";
import CreateCommunityForm from "./components/superAdminPage/CreateCommunityForm";
import AllCommunitiesForm from "./components/superAdminPage/AllCommunitiesForm";
import AllUsersSAForm from "./components/superAdminPage/AllUsersSAForm";
import ProtectedPage from "./pages/ProtectedPage";
import RemoveUserFromCommunityForm from "./components/superAdminPage/RemoveUserFromCommunityForm";
import MyOffersPage from "./pages/MyOffersPage";
import MyPendingOffers from "./pages/MyPendingOffers";
import HelloPage from "./pages/HelloPage";
import CreateUserSAForm from "./components/superAdminPage/CreateUserSAForm";
import DeleteUserSAForm from "./components/superAdminPage/DeleteUserSAForm";

const unprotectedRouter = createBrowserRouter([
  {
    element: (
      <>
        <Appbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HelloPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "*",
        element: <ProtectedPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const router = createBrowserRouter([
  {
    element: (
      <>
        <Appbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HelloPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "show-all-users",
            element: <AllUsers />,
          },
          {
            path: "create-user",
            element: <CreateUserForm />,
          },
          {
            path: "delete-user",
            element: <DeleteUserForm />,
          },
          {
            path: "remove-user-from-community",
            element: <RemoveFromCommForm />,
          },
          {
            path: "add-user-to-community",
            element: <AddUserForm />,
          },
        ],
      },
      {
        path: "/super-admin",
        element: <SuperAdminPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "all-communities",
            element: <AllCommunitiesForm />,
          },
          {
            path: "all-users",
            element: <AllUsersSAForm />,
          },
          {
            path: "create-community",
            element: <CreateCommunityForm />,
          },
          {
            path: "delete-community",
            element: <DeleteCommunityForm />,
          },
          {
            path: "add-user-to-community",
            element: <AddUserToCommunityForm />,
          },
          {
            path: "remove-user-from-community",
            element: <RemoveUserFromCommunityForm />,
          },
          {
            path: "create-user",
            element: <CreateUserSAForm />,
          },
          {
            path: "delete-user",
            element: <DeleteUserSAForm />,
          },
        ],
      },
      {
        path: "/transaction-history",
        element: <TransactionsHistoryPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile/:userId",
        element: <ProfilePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/wall",
        element: <WallPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/my-offers",
        element: <MyOffersPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/my-pending-offers",
        element: <MyPendingOffers />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/wall/create-offer",
        element: <CreateOfferPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/offer/:offerId",
        element: <OfferPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Box>
      <CssBaseline />
      {authCtx.userIsLoggedIn ? (
        <RouterProvider router={router} />
      ) : (
        <RouterProvider router={unprotectedRouter} />
      )}
    </Box>
  );
};

export default App;
