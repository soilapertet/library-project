import Book from "./books.js";

// Code to trigger the form to scale up and down
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