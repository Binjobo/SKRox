import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";

export default function AuthPage({ setUser }) {
  const [isNewAccount, setIsNewAccount] = useState(null);

  const handleSignUpClick = () => {
    setIsNewAccount(true);
  };

  const handleLoginClick = () => {
    setIsNewAccount(false);
  };

  return (
    <>
      <div>
        <h1>The best dating site for Short King and Short Queen!</h1>
      </div>

      <div className="authPage">
        <div className="authButtons">
          <button onClick={handleSignUpClick}>Sign Up</button>
          <button onClick={handleLoginClick}>Login</button>
        </div>
        {isNewAccount !== null &&
          (isNewAccount ? (
            <SignUpForm setIsNewAccount={setIsNewAccount} setUser={setUser} />
          ) : (
            <LoginForm setIsNewAccount={setIsNewAccount} setUser={setUser} />
          ))}
      </div>
    </>
  );
}
