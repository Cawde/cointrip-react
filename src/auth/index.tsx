export function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function setToken(token:string) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function setUserId(id:string) {
  localStorage.setItem("id", id);
}

export function getUserId() {
  localStorage.getItem("id");
}