import { Link } from "react-router";
import { auth } from "../firebase";

export default function Footer() {
  const user = auth.currentUser;

  return (
    <footer className="h-12 flex flex-col items-center justify-center">
      {user !== null && (
        <nav>
          <ul>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </nav>
      )}
      <p className="text-xs">&copy; 2025 Kyungseok Oh</p>
    </footer>
  );
}
