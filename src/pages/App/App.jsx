import AuthPage from "../AuthPage/AuthPage";
import MatchPage from "../MatchPage/MatchPage";
import ProfileAndPreference from "../ProfileAndPreferencePage/ProfileAndPreferencePage";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";

import HomePage from "../HomePage/HomePage";
import ChatPage from "../ChatPage/ChatPage";

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const [user, setUser] = useState(null);

  const authToken = cookies.AuthToken;

  return (
    <div className="background">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        {authToken && (
          <Route
            path="/matches"
            element={<MatchPage user={user} setUser={setUser} />}
          />
        )}
        {authToken && (
          <Route path="/profile" element={<ProfileAndPreference />} />
        )}
        {authToken && <Route path="/homepage" element={<HomePage />} />}
        {authToken && (
          <Route
            path="/chatpage"
            element={<ChatPage user={user} setUser={setUser} />}
          />
        )}
      </Routes>
    </div>
  );
}
