import { Navigate } from "react-router";
import { auth } from "../firebase";
import { PropsWithChildren } from "react";

export default function ProtectedRoute({
  children,
  userOnly = false,
}: PropsWithChildren<{ userOnly?: boolean }>) {
  const user = auth.currentUser;
  if (userOnly === true && user === null) {
    return <Navigate to="/login" />;
  }
  if (userOnly === false && user !== null) {
    return <Navigate to="/" />;
  }
  return children;
}
