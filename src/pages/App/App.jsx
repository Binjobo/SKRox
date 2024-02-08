import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar";
import ProfilePage from "../ProfilePage/ProfilePage";
import PreferencePage from "../PreferencePage/PreferencePage";
import MatchPage from "../MatchPage/MatchPage";
import ChatPage from "../MatchPage/MatchPage";

export default function App() {
  const [user, setUser] = useState(false);
  // console.log(user);

  const handleClick = () => {
    setUser(!user);
  };

  return (
    <>
      {user ? (
        <>
          <NavBar />
          <div>
            <Routes>
              <Route
                path="/"
                element={<Homepage user={user} setUser={setUser} />}
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/preference" element={<PreferencePage />} />{" "}
              <Route path="/match" element={<MatchPage />} />{" "}
              <Route path="/chat" element={<ChatPage />} />
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
