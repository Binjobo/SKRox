import { NavLink } from "react-router-dom";

export default function NavBar({ user }) {
  return (
    <nav>
      SKRox
      {user && (
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          {/* <li>
          <NavLink to="/preference">Preference</NavLink>
        </li>  */}
          <li>
            <NavLink to="/match">Match</NavLink>
          </li>
          <li>
            <NavLink to="/chat">Chat</NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}
