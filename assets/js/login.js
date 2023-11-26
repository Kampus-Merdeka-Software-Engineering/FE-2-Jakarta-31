const showPopup = document.querySelector(".login");
const formPopup = document.querySelector(".form-popup");
const hidePopup = document.querySelector(".form-popup .close-btn");
const logregLink = document.querySelectorAll(".form-box .bottom-link a");
const loginForm = document.getElementById("login-form");
const regisForm = document.getElementById("regis-form");
const logoutButton = document.querySelector(".login span");

showPopup.addEventListener("click", () => {
  document.querySelector("body").classList.add("show-popup");
});

hidePopup.addEventListener("click", () => {
  document.querySelector("body").classList.remove("show-popup");
});

logregLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    formPopup.classList[link.id === "regis-link" ? "add" : "remove"]("show-regis");
  });
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  logoutButton.textContent = "Log Out";
  document.querySelector("body").classList.remove("show-popup");
});

regisForm.addEventListener("submit", (e) => {
  e.preventDefault();
  logoutButton.textContent = "Log Out";
  document.querySelector("body").classList.remove("show-popup");
});

logoutButton.addEventListener("click", () => {
  logoutButton.textContent = "Log In";
});
