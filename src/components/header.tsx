import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebase";

export default function Header() {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/login", {
      replace: true,
    });
  };
  console.log(auth.currentUser);
  return (
    <header className="flex items-center justify-center h-12">
      <nav>
        <ul className="flex gap-x-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/qt">QT</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
