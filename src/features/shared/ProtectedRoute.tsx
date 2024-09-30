import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import { AUTH_PATH } from "../../constant/path";

type Props = PropsWithChildren;

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = useAuthStore((state) => state.isAutheticated());

  if (!isAuthenticated) {
    return <Navigate to={AUTH_PATH} />;
  }

  return children;
};

export default ProtectedRoute;
