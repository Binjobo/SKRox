import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const LoginAndSignup = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [gender, setGender] = useState(null);
  const [height, setHeight] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  let navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords need to match!");
        return;
      }

      if (password.length < 3) {
        setError("Passwords need to be longer than 3 characters!");
        return;
      }

      if (gender === "male" && height > 165) {
        setError(
          "Dude you are too tall! Perhaps this is not the place for yer."
        );
        return;
      }

      if (gender === "female" && height > 155) {
        setError("Yer tall gal! Find your prince charming elsewhere please ~");
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/${isSignUp ? "signup" : "login"}`,
        { email, password },
        {
          headers: {
            Cookie: `AuthToken=${cookies.AuthToken}; UserId=${
              cookies.UserId
            }; isAdmin=${cookies.isAdmin || false}`, // Include cookies in the headers
          },
        }
      );

      const { token, userId, isAdmin } = response.data;

      console.log("TEST", isAdmin);

      // setCookie("AuthToken", response.data.token);
      // setCookie("UserId", response.data.userId);
      setCookie("AuthToken", token);
      setCookie("UserId", userId);
      setCookie("isAdmin", isAdmin);

      if (isAdmin) {
        // Redirect to admin panel route
        navigate("/adminpanel");
      } else {
        // if (isSignUp) {
        //   navigate("/profile");
        // } else {
        //   navigate("/homepage");
        // }
        const success = response.status === 201;
        if (success && isSignUp) navigate("/profile");
        if (success && !isSignUp) navigate("/homepage");
      }

      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("Email already exists. Please use a different email.");
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <div onClick={handleClick}>
        <button className="loginSignupClose">Close</button>
      </div>

      <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="signup">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="signup">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isSignUp && (
          <div className="form-group">
            <label className="signup">Confirm Password</label>
            <input
              type="password"
              id="password-check"
              name="password-check"
              placeholder="confirm password"
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
        {isSignUp && (
          <div className="form-group">
            <label className="signup">Gender</label>
            <select
              id="gender"
              name="gender"
              value={gender}
              required={true}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        )}
        {isSignUp && (
          <div className="form-group">
            <label className="signup">Height</label>
            <input
              type="height"
              id="height"
              name="height"
              placeholder="height in cm"
              required={true}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        )}

        <input type="submit" />
        <p>{error}</p>
      </form>
    </div>
  );
};
export default LoginAndSignup;
