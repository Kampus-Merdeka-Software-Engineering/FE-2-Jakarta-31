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

function subscribe() {
  // Mendapatkan nilai email dari input
  const email = document.getElementById("email").value;
  const messageElement = document.getElementById("subscription-message");

  // Menampilkan pesan terima kasih jika email diisi
  if (email) {
    alert("Thank's for subscribing!🤩");
    closeSubscribeForm();
    // Anda bisa menambahkan logika lain di sini, misalnya mengirim data ke server
  } else {
    // Menampilkan pesan jika email kosong
    alert("Please enter your email address first.");
  }

  // Menutup form subscribe setelah melakukan subscribe (Anda bisa memodifikasi ini sesuai kebutuhan)
}

function closeSubscribeForm() {
  document.querySelector(".subscribe-form").classList.remove("active");
}

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
  closeSubscribeForm();
});
