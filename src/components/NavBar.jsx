import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      SKRox
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
    </nav>
  );
}
