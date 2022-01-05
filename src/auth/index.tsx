export function setUserIdLS(id:string) {
  localStorage.setItem("id", id);
}

export function setUserFirstNameLS(firstName:string) {
  localStorage.setItem("firstName", firstName);
}

export function setUserLastNameLS(lastName:string) {
  localStorage.setItem("lastName", lastName);
}

export function setUserEmail(email:string) {
  localStorage.setItem("email", email);
}

export function getUserIdLS() {
  return localStorage.getItem("id");
}