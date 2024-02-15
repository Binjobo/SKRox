import ChatContainer from "../../components/ChatBox";
import NavBar from "../../components/NavBar";

const ChatPage = ({ user, setUser }) => {
  return (
    <>
      <NavBar />
      <ChatContainer user={user} setUser={setUser} />
    </>
  );
};

export default ChatPage;
