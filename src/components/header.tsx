import { Link } from "react-router";

export default function Header() {
  return <header className="h-12 flex items-center justify-center">
    <nav>
      <ul className="flex gap-x-2">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/qt">QT</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  </header>
}