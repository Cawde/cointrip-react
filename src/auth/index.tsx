export function setUserIdLS(id:string) {
  localStorage.setItem("id", id);
}

export function getUserIdLS() {
  return localStorage.getItem("id");
}