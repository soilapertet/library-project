import Book from "./books.js";

// Trigger the form to scale up and down
const openForm = document.querySelector("#open-form");
const closeForm = document.querySelector("#close-form");
const popUpForm = document.querySelector("#popup-form");
const overlay = document.querySelector(".overlay");

function openPopupForm() {
  popUpForm.classList.remove("hide");
  popUpForm.classList.add("show");
  overlay.classList.add("show");
}

function closePopupForm() {
  popUpForm.classList.remove("show");
  overlay.classList.remove("show");
  popUpForm.classList.add("hide");
}

openForm.addEventListener("click", openPopupForm);
closeForm.addEventListener("click", closePopupForm);

// Collect data from the form
const title = document.querySelector("#title").value;
const author = document.querySelector("#author").value;
const numberOfPages = + document.querySelector("#total-pages").value;
const currentPage = + document.querySelector("#current-page").value;

