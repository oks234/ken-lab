import { Outlet } from "react-router";
import Footer from "./footer";

export default function AuthLayout() {
  return (
    <div className="max-w-md mx-auto px-4">
      <div className="py-12">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
