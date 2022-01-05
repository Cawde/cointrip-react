export function setUserIdLS(id: string) {
  localStorage.setItem("id", id);
}

export function setUserFirstNameLS(firstName: string) {
  localStorage.setItem("firstName", firstName);
}

export function setUserLastNameLS(lastName: string) {
  localStorage.setItem("lastName", lastName);
}

export function setUserEmailLS(email: string) {
  localStorage.setItem("email", email);
}

export function getUserIdLS() {
  return localStorage.getItem("id");
}

export function getFirstNameLS() {
  return localStorage.getItem("firstName");
}

export function getLastNameLS() {
  return localStorage.getItem("lastName");
}

export function getEmailLS() {
  return localStorage.getItem("email");
}
