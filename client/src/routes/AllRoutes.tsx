import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoutes";
import Login from "../pages/auth/ui/Login";
import Events from "../pages/events/ui/Events";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <ProtectedRoute component={Login} isPublic />,
  },
  {
    path: "/events",
    element: <ProtectedRoute component={Events} />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);
