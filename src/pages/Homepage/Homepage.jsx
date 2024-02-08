import * as userService from "../../utilities/users-service";

export default function Homepage({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  console.log(user?.name);
  return (
    <>
      Hi {user.name}, you have an amazing height of {user.height} cm!
      <button className="logout" onClick={handleLogOut}>
        Log Out
      </button>
    </>
  );
}
