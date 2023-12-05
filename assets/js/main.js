// Burger Bar
const convas_btn = document.querySelectorAll(".fa-bars");
const convas = document.querySelector(".offconvas");
convas_btn.forEach((element) => {
  element.addEventListener("click", (e) => {
    convas.classList.toggle("active");
  });
});
document.querySelector(".close").onclick = function () {
  convas.classList.remove("active");
};

// BUTTON SUBSCRIBE
let isSubscribed = false;

function subscribe() {
  const email = document.getElementById("email").value;
  const messageElement = document.getElementById("subscription-message");

  if (email) {
    alert("Thank's for subscribing!🤩");
    isSubscribed = true;
    updateSubscriptionUI();
    closeSubscribeForm();
  } else {
    alert("Please enter your email address first!");
  }
}

function updateSubscriptionUI() {
  const emailElement = document.getElementById("email");
  if (isSubscribed) {
    emailElement.style.display = "none";
  } else {
    emailElement.style.display = "block";
  }
}

function closeSubscribeForm() {
  document.querySelector(".subscribe-form").classList.remove("active");
}

// Button Subscribe Navbar
document.querySelector("#open-subscribe-form").addEventListener("click", function () {
  document.querySelector(".subscribe-form").classList.add("active");
  updateSubscriptionUI();
});

// Button Subscribe Mobile
document.querySelector("#open-subscribe-form-main").addEventListener("click", function () {
  document.querySelector(".subscribe-form").classList.add("active");
  updateSubscriptionUI();
});

// Close Button
document.querySelector(".subscribe-form .close-btn").addEventListener("click", function () {
  closeSubscribeForm();
});
