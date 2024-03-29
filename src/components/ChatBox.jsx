import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import { useState } from "react";

const ChatBox = ({ user }) => {
  const [clickedUser, setClickedUser] = useState(null);

  console.log("clickedUser", clickedUser);

  return (
    <div className="chat-box">
      <div>
        <button className="option" onClick={() => setClickedUser(null)}>
          Matches
        </button>
        <button className="option" disabled={!clickedUser}>
          Chat
        </button>
      </div>

      {!clickedUser && (
        <MatchesDisplay
          matches={user.matches}
          setClickedUser={setClickedUser}
        />
      )}

      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
    </div>
  );
};

export default ChatBox;
