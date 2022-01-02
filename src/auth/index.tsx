export function setUserIdLS(id:string) {
  localStorage.setItem("id", id);
}

export function getUserIdLS() {
  localStorage.getItem("id");
}