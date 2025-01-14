import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./components/auth-layout";
import Layout from "./components/layout";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import Home from "./routes/home";
import Join from "./routes/join";
import Login from "./routes/login";
import Qt from "./routes/qt";
import ProtectedRoute from "./components/protected-route";

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute userOnly>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />}></Route>
              <Route path="qt" element={<Qt />}></Route>
            </Route>
            <Route
              element={
                <ProtectedRoute>
                  <AuthLayout />
                </ProtectedRoute>
              }
            >
              <Route path="join" element={<Join />}></Route>
              <Route path="login" element={<Login />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
