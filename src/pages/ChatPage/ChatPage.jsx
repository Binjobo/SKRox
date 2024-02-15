import ChatBox from "../../components/ChatBox";
import NavBar from "../../components/NavBar";

const ChatPage = ({ user, setUser }) => {
  return (
    <>
      <NavBar />
      <ChatBox user={user} setUser={setUser} />
    </>
  );
};

export default ChatPage;
