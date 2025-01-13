import { Outlet } from "react-router";
import Footer from "./footer";

export default function AuthLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
