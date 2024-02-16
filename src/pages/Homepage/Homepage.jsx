import NavBar from "../../components/NavBar";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <h1>A place to find love and not get judged for your height</h1>
      <button onClick={logout}>Log out</button>
    </>
  );
}
