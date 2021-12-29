export function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function logInUserToLocalStorage(token:string) {
  localStorage.setItem("token", token);
}

export function RemoveUserFromLocalStorage() {
  localStorage.removeItem("token");
}
