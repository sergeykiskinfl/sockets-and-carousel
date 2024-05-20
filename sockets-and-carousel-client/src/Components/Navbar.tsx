import { Link } from "react-router-dom";

export default function Navbar(): JSX.Element {
  return (
    <nav className="navbar-container">
      <Link to="/">главная</Link>
      <Link to="/dashboard" className="text-nowrap">панель менеджера</Link>
    </nav>
  );
}
