import NavBar from "../../components/Navbar";
import AuthModel from "../../components/LoginAndSignup";
import { useState } from "react";
import { useCookies } from "react-cookie";

const AuthPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const authToken = cookies.AuthToken;

  const handleSignupClick = () => {
    if (authToken) {
      removeCookie("UserId", cookies.UserId);
      removeCookie("AuthToken", cookies.AuthToken);
      window.location.reload();
      return;
    }

    setShowModal(true);
    setIsSignUp(true);
  };

  const handleLoginClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  return (
    <>
      <div className="background">
        <NavBar />
        <div className="home">
          <h1>SKRox</h1>
          <h2>The BEST Dating Site for Short Kings & Queens</h2>
          <button className="login-signup" onClick={handleSignupClick}>
            {authToken ? "Sign out" : "Sign up"}
          </button>

          {!authToken && (
            <button className="login-signup" onClick={handleLoginClick}>
              {" "}
              Log in
            </button>
          )}

          <br />
          <hr />
          {showModal && (
            <AuthModel setShowModal={setShowModal} isSignUp={isSignUp} />
          )}
        </div>
      </div>
    </>
  );
};

export default AuthPage;
