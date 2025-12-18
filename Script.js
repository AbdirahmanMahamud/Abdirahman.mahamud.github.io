const toggle = document.getElementById("theme-toggle");
toggle.onclick = () => document.body.classList.toggle("dark");

function openModal(el) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modal-img").src = el.src;
  document.getElementById("modal-title").innerText = el.dataset.title;
  document.getElementById("modal-text").innerText = el.dataset.review;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
