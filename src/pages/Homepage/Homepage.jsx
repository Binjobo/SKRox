import * as userService from "../../utilities/users-service";

export default function Homepage({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  console.log(user.name);
  return (
    <>
      Hi {user.name}
      <button className="logout" onClick={handleLogOut}>
        Log Out
      </button>
    </>
  );
}
