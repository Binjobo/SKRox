import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import SKRoxLogo from "../images/SKRoxLogo.png";

const NavBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const authToken = cookies.AuthToken;

  return (
    <>
      <nav>
        {/* <img src="../../images/SKRoxLogo.png"/> */}
        <img src={SKRoxLogo} alt="logo" className="logo"></img>
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
