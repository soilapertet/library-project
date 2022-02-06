import Book from "./books.js";

// Declare variables
let statusArray, radioValue,i;
let bookLibrary = [];

// Collect data from the form
let inputtedTitle = document.querySelector("#title").value;
let inputtedAuthor = document.querySelector("#author").value;
let inputtedCurrentPage = + document.querySelector("#current-page").value;
let selectedRadioValue = collectRadioValue();

// Trigger the form to scale up and down
const openForm = document.querySelector("#open-form");
const closeForm = document.querySelector("#close-form");
const popUpForm = document.querySelector("#popup-form");
const overlay = document.querySelector(".overlay");
const addBookButton = document.querySelector("#add-book");

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

// Collect the value from the selected radio button 
function collectRadioValue () {

  // Create a nodeList for input elements with name="book-status"
  statusArray = document.querySelectorAll("#book-status input");

  // Loop through each item in the nodeList to check which radio button is checked;
  // Create a variable to store the value of the checked radio button;
  for(i = 0; i < statusArray.length; i++) {
    if(statusArray[i].checked) {
      radioValue = statusArray[i].value;
    }
  }
  return radioValue;
}


