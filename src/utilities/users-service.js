import * as usersAPI from "./users-api";

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

//* service checks and prepares the data
export async function signUp(userData) {
  // validation
  if (userData.password.trim().length < 5) {
    return null;
  }
  const token = await usersAPI.signUp(userData);
  // return user from token
  return token;
}

export async function login(userData) {
  const token = await usersAPI.login(userData);
  localStorage.setItem("token", token);
  return getUser();
}

//log out
export function logOut() {
  localStorage.removeItem("token");
}

//admin
export function getAdmin() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user.isAdmin : null;
}

export async function allUsers() {
  const users = await usersAPI.allUsers();
  console.log("allUsers", users);
  return users;
}
