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
    fetch("https://be-2-jakarta-31-production.up.railway.app/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Subscription failed");
        }
      })
      .then((data) => {
        alert("Thank's for Subscribing!🤩");
        isSubscribed = true;
        updateSubscriptionUI();
        closeSubscribeForm();
      })
      .catch((error) => {
        console.error("Error during subscription:", error);
        alert("Subscription failed. Please try again.");
      });
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

// CRITICISM & SUGGESTION
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("feedbackForm");
  const responseDiv = document.getElementById("response");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email-user").value;
    const pesan = document.getElementById("message").value;

    console.log("Email:", email);
    console.log("Pesan", pesan);

    fetch("https://be-2-jakarta-31-production.up.railway.app/kritik", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pesan }),
    })
      .then((response) => response.json())
      .then((data) => {
        responseDiv.textContent = data.pesan;
        alert("Message Sent Successfully! Thank's for Reaching Out📬");
        form.reset();
      })
      .catch((error) => {
        console.error("Error during form submission:", error);
        responseDiv.textContent = "Error Submitting the form. Please try again";
      });
  });
});
