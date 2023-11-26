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

// BUTTON SUBSCRIBE NAVBAR
document.querySelector("#open-subscribe-form").addEventListener("click", function () {
  document.querySelector(".subscribe-form").classList.add("active");
});

// BUTTON SUBSCRIBE MOBILE
document.querySelector("#open-subscribe-form-main").addEventListener("click", function () {
  document.querySelector(".subscribe-form").classList.add("active");
});

// CLOSE BUTTON
document.querySelector(".subscribe-form .close-btn").addEventListener("click", function () {
  document.querySelector(".subscribe-form").classList.remove("active");
});

// SUBSCRIBE / UNSUBSCRIBE FUNCTIONALITY
document.querySelector(".subscribe-form .form button").addEventListener("click", function () {
  let isSubscribed = false;
  if (!isSubscribed) {
    isSubscribed = true;
    document.querySelector(".subscribe-form").classList.remove("active");
    document.querySelector("#open-subscribe-form-main p").innerHTML = "Unsubscribe";
  } else {
    isSubscribed = false;
    document.querySelector("#open-subscribe-form-main p").innerHTML = "Subscribe";
  }
});

document.querySelector("#open-subscribe-form-main").addEventListener("click", function () {
  if (document.querySelector("#open-subscribe-form-main p").innerHTML === "Unsubscribe") {
    document.querySelector("#open-subscribe-form-main p").innerHTML = "Subscribe";
  } else {
    document.querySelector(".subscribe-form").classList.add("active");
  }
});
