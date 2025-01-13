import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
