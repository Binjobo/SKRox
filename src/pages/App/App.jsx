import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import AuthPage from "./AuthPage/AuthPage";

export default function App() {
  const [user, setUser] = useState(false);

  const handleClick = () => {
    setUser(!user);
  };

  return (
    <>
      {user ? (
        <>
          <div className="flex">
            <Routes>
              <Route path="/dashboard" element={<Homepage />} />
            </Routes>
          </div>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
      <div className="fixed right-0 bottom-0">
        <button className="bg-jade-300" onClick={handleClick}>
          Tmp button to toggle setUser state
        </button>
      </div>
    </>
  );
}
