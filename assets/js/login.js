const showPopup = document.querySelector(".login");
const formPopup = document.querySelector(".form-popup");
const hidePopup = document.querySelector(".form-popup .close-btn");
const logregLink = document.querySelectorAll(".form-box .bottom-link a");
const loginForm = document.getElementById("login-form");
const regisForm = document.getElementById("regis-form");
const logoutButton = document.querySelector(".login span");
const loginMobileButton = document.querySelector(".login-mobile");

const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
const username = sessionStorage.getItem("username");

if (isLoggedIn) {
  showLoggedInUI();
}

loginMobileButton.addEventListener("click", () => {
  document.querySelector("body").classList.add("show-popup");
});

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
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email == "user@example.com" && password === "password") {
    sessionStorage.setItem("isLoggedIn", true);
    sessionStorage.setItem("username", email);
    showLoggedInUI();
  } else {
    alert("Invalid email or password. Please try again.");
  }

  document.querySelector("body").classList.remove("show-popup");
});

regisForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  sessionStorage.setItem("isLoggedIn", true);
  sessionStorage.setItem("username", email);
  showLoggedInUI();

  document.querySelector("body").classList.remove("show-popup");
});

logoutButton.addEventListener("click", () => {
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("username");
  showLoggedOutUI();
});

function showLoggedInUI() {
  const username = sessionStorage.getItem("username");
  const message = "Welcome, ${username}!🙋🏻 You have Successfully logged in";
  alert(message);

  logoutButton.textContent = "Log Out";
}

function showLoggedOutUI() {
  logoutButton.textContent = "Log In";
}
