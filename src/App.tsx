import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout";
import Home from "./routes/home";
import Join from "./routes/join";
import Login from "./routes/login";
import Logout from "./routes/logout";
import Qt from "./routes/qt";
import AuthLayout from "./components/auth-layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="qt" element={<Qt />}></Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="join" element={<Join />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="logout" element={<Logout />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
