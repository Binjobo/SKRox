import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import AuthPage from "../AuthPage/AuthPage";

export default function App() {
  const [user, setUser] = useState(false);
  // console.log(user);

  const handleClick = () => {
    setUser(!user);
  };

  return (
    <>
      SKROX
      {user ? (
        <>
          <div>
            <Routes>
              <Route
                path="/"
                element={<Homepage user={user} setUser={setUser} />}
              />
            </Routes>
          </div>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
      <div>
        <button className="toggleButton" onClick={handleClick}>
          Tmp admin
        </button>
      </div>
    </>
  );
}
