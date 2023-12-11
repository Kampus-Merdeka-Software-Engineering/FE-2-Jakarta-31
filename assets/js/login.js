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

if (loginMobileButton) {
  loginMobileButton.addEventListener("click", () => {
    document.querySelector("body").classList.add("show-popup");
  });
}

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

const apiUrl = "https://be-2-jakarta-31-production.up.railway.app";

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email-login").value;
  const password = document.getElementById("password-login").value;

  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("username", email);
      alert("Welcome Back!🙋🏻‍♀️ You have Successfully LoggedIn.");
      document.querySelector("body").classList.remove("show-popup");
    } else {
      const errorData = await response.json();
      alert(`Login failed: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
});

regisForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nama = document.getElementById("nama-regis").value;
  const email = document.getElementById("email-regis").value;
  const password = document.getElementById("password-regis").value;

  console.log("Nama:", nama);

  try {
    const response = await fetch(`${apiUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nama, email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("username", nama);
      sessionStorage.setItem("email", email);
      alert(`Welcome, ${nama}!🙋🏻‍♀️ You have Successfully Signed Up`);
      document.querySelector("body").classList.remove("show-popup");
      showLoggedInUI();
    } else {
      const errorData = await response.json();
      console.error("Registration failed:", errorData);
      alert(`Registration failed: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
});

logoutButton.addEventListener("click", () => {
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("username");
  showPopup.reset();
  showLoggedOutUI();
});

function showLoggedInUI() {
  logoutButton.textContent = "Log Out";
}

function showLoggedOutUI() {
  logoutButton.textContent = "Log In";
}
