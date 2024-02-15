const Chat = ({ messages }) => {
  return (
    <>
      <div className="chat-box">
        {messages.map((message, _index) => (
          <div key={_index}>
            <div>
              <div>
                <img src={message.img} alt="profile message" />
              </div>
              <p>{message.name}</p>
            </div>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Chat;
