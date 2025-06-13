import { Navigate } from "react-router-dom";
import { useAuthStore } from "../features";

interface ProtectedRouteProps {
  component: React.ComponentType;
  isPublic?: boolean;
}

export function ProtectedRoute({
  component: Component,
  isPublic = false,
}: ProtectedRouteProps) {
  const { token } = useAuthStore();
  if (isPublic && token) return <Navigate to="/events" />;
  if (!isPublic && !token) return <Navigate to="/login" />;
  return <Component />;
}
