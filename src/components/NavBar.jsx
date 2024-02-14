import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const authToken = cookies.AuthToken;

  return (
    <>
      <nav>
        SKRox-Logo
        {authToken && (
          <ul>
            <li>
              <NavLink to="/">Back</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile & Preference</NavLink>
            </li>
            <li>
              <NavLink to="/matches">Matches</NavLink>
            </li>
            <li>
              <NavLink to="/chatpage">Chat</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default NavBar;
