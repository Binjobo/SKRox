import ChatContainer from "../../components/ChatContainer";
import NavBar from "../../components/Navbar";

const ChatPage = ({ user, setUser }) => {
  return (
    <>
      <NavBar />
      <ChatContainer user={user} setUser={setUser} />
    </>
  );
};

export default ChatPage;
