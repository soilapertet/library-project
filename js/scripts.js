// Declare variables
let statusArray, radioValue,  i, currentPage, pageValue, bookLibrary;
let plannedBooks, readingBooks, completedBooks, totalBooks;
let trackPlannedBooks, trackReadingBooks, trackCompletedBooks, trackTotalBooks;
let plannedCounter = 0;
let readingCounter = 0;
let completedCounter = 0;

plannedBooks = + document.querySelector("#planned-books").value;
readingBooks = + document.querySelector("#reading-books").value;
completedBooks = + document.querySelector("#completed-books").value;
totalBooks = + document.querySelector("#total-books").value;

// Initiate bookLibrary array
function initiateBookLibrary() {
  if(JSON.parse(localStorage.getItem("bookLibrary") === null)) {
    bookLibrary = [];
  }
  else {
    bookLibrary = JSON.parse(localStorage.getItem("bookLibrary"));
  }
  return bookLibrary;
}

// Save data to local storage
function storeToLocalStorage(){
  localStorage.setItem("bookLibrary", JSON.stringify(bookLibrary)); /** Saving any changes made to book object to local storage */
}

// Class function
class Book {
  constructor (
    title,
    author,
    bookStatus,
    currentPageNumber,
    totalPageNumber,
    total
  )
  {
    this.title = title;
    this.author = author;
    this.bookStatus = bookStatus;
    this.currentPageNumber = currentPageNumber;
    this.totalPageNumber = totalPageNumber;
    this.total = total;
  }
}

// Open and Close popup form 
const libraryMessage = document.querySelector(".library-message");
const libraryMessageHeading= document.querySelector(".library-message h1");
const libraryMessageImage= document.querySelector(".library-message img");
const popUpForm = document.querySelector("#popup-form");
const overlay = document.querySelector(".overlay");
const openFormButton = document.querySelector("#open-form");
const closeFormButton = document.querySelector("#close-form");

function openPopupForm() {
  libraryMessage.style.marginTop = "2vw"; 
  libraryMessageHeading.classList.add("hide");
  libraryMessageImage.classList.add("hide");
  popUpForm.classList.remove("hide");
  popUpForm.classList.add("show");
  overlay.classList.add("show");
}

function closePopupForm() {
  popUpForm.classList.remove("show");
  overlay.classList.remove("show");
  popUpForm.classList.add("hide");
}

// Add event listeners to "open-form" and "close-form" buttons
openFormButton.addEventListener("click", openPopupForm);
closeFormButton.addEventListener("click", closePopupForm);

// Toggle Menu
const menuToggle = document.querySelector(".menu-toggle");
const hamburgerMenu = Array.from(document.querySelectorAll(".menu-toggle > span"));
const navBar = document.querySelector(".nav-bar");
const navRight = document.querySelector(".nav-right");

// Add event listeners to toggle menu
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  hamburgerMenu.forEach((item) => {
    item.classList.toggle("active");
  });
  navBar.classList.toggle("active");
  navRight.classList.toggle("active");
  overlay.classList.toggle("show");
});

// Loop through the NodeList and checked which radio button is checked
function collectRadioValue () {

  statusArray = document.querySelectorAll("#book-status input"); 

  for(i = 0; i < statusArray.length; ++i) {
    if(statusArray[i].checked) {
      radioValue = statusArray[i].value;
    }
  }
  return radioValue;
}

// Check which radio button is clicked and set the value of the current page
const setCurrentPageNumber = () => {
  
  if(collectRadioValue() === "Plan To Read") {
    document.querySelector("#current-page").setAttribute("disabled", "true");
    currentPage = 0;
  }
  else if (collectRadioValue() === "Reading") {
    document.querySelector("#current-page").removeAttribute("disabled");
    currentPage = + document.querySelector("#current-page").value;
  }
  else {
    document.querySelector("#current-page").setAttribute("disabled", "true");
    currentPage = + document.querySelector("#total-pages").value;
  }
  return currentPage;
}


const trackBookNumber = () => {
  if(collectRadioValue() === "Plan To Read") {
    trackPlannedBooks = ++plannedBooks;
    trackReadingBooks = 0;
    trackCompletedBooks = 0;
    trackTotalBooks = ++totalBooks;

    document.querySelector("#planned-books").setAttribute("value", trackPlannedBooks);
    document.querySelector("#total-books").setAttribute("value", trackTotalBooks);
  } 
  else if(collectRadioValue() === "Reading") {
    trackPlannedBooks = 0;
    trackReadingBooks = ++readingBooks;
    trackCompletedBooks = 0;
    trackTotalBooks = ++totalBooks;

    document.querySelector("#reading-books").setAttribute("value",trackReadingBooks);
    document.querySelector("#total-books").setAttribute("value", trackTotalBooks);

  } 
  else {
    trackPlannedBooks = 0;
    trackReadingBooks = 0;
    trackCompletedBooks = ++completedBooks;
    trackTotalBooks = ++totalBooks;

    document.querySelector("#completed-books").setAttribute("value", trackCompletedBooks);
    document.querySelector("#total-books").setAttribute("value", trackTotalBooks);
  }
  return trackPlannedBooks,trackReadingBooks, trackCompletedBooks, trackTotalBooks;
}

const updateBookSummary = (book) => {
  
  if(book.bookStatus === "Plan To Read") {
    ++plannedCounter;
    document.querySelector("#planned-books").setAttribute("value", plannedCounter);
  } else if (book.bookStatus === "Reading") {
    ++readingCounter;
    document.querySelector("#reading-books").setAttribute("value", readingCounter);
  } else {
    ++completedCounter;
    document.querySelector("#completed-books").setAttribute("value", completedCounter);
  }
}

// Add event listeners to radio buttons to set value for current page
const planToRead = document.querySelector("#plan-to-read");
const reading = document.querySelector("#reading");
const completed = document.querySelector("#completed");

planToRead.addEventListener("click", setCurrentPageNumber);
reading.addEventListener("click", setCurrentPageNumber);
completed.addEventListener("click", setCurrentPageNumber);

// Reset library grid on the page
function resetLibraryGrid() {
  const libraryGrid = document.querySelector("#library-books"); 
  libraryGrid.innerHTML = "";
}

// Create a function to create Book Objects and push them to the array
function pushBookToArray() {

  let inputtedTitle = document.querySelector("#title").value;
  let inputtedAuthor = document.querySelector("#author").value;
  let inputtedNumberOfPages = + document.querySelector("#total-pages").value;
  trackBookNumber();

  const book = new Book (
    inputtedTitle,
    inputtedAuthor,
    collectRadioValue(), // return radioValue
    setCurrentPageNumber(), // return currentPage
    inputtedNumberOfPages,
    trackTotalBooks
  ); 

  bookLibrary.push(book);
  storeToLocalStorage();
  return bookLibrary;
}

// Function for rating the books
function executeRating(array) {

  const starClassActive = "rating__star fas fa-star";
  const starClassInactive = "rating__star far fa-star";
  const starsLength = array.length;
  let j;
  array.map(function(item) {
   item.onclick = function() {
      // set j to the value of the index of the star clicked
      j = array.indexOf(item); 

      // Check if the star is "active"/"inactive"
      if (item.className === starClassInactive) {
        for (j; j >= 0; --j) {
          array[j].className = starClassActive; // make the "inactive" stars "active"; increase rating
        }  
      } 
      else {
        for (j; j < starsLength; ++j) {
          array[j].className = starClassInactive; // make the "active" stars inactive; decrease rating
        }
      }
    };
  });
}

// Display each book object in the array on the webpage`
function addBooksToLibrary(book) {

  const libraryBook = document.createElement("section");
  libraryBook.classList.add("library-book");
  libraryBook.setAttribute("data-index", `${bookLibrary.indexOf(book)}`);

  const bookTitle = document.createElement("h1");
  bookTitle.innerHTML = book.title;
  libraryBook.appendChild(bookTitle);

  const bookAuthor = document.createElement("p");
  bookAuthor.innerHTML = `By: ${book.author}`;
  libraryBook.appendChild(bookAuthor);

  const currentBookStatus = document.createElement("p");
  currentBookStatus.classList.add("current-status");
  currentBookStatus.innerHTML = `Book Status: ${book.bookStatus}`;
  libraryBook.appendChild(currentBookStatus);

  const bookPages = document.createElement("div");
  bookPages.classList.add("book-pages");
  const pagesContent = document.createElement("p");
  pagesContent.innerHTML = `
    Pages: <input type="text" id="page-number" value="${book.currentPageNumber}">/${book.totalPageNumber}
  `;
  bookPages.appendChild(pagesContent);
  const plusIcon = document.createElement("i");
  plusIcon.classList.add("fas", "fa-plus-circle");
  bookPages.appendChild(plusIcon);
  libraryBook.appendChild(bookPages);

  const updateBookStatus = document.createElement("div");
  updateBookStatus.classList.add("update-status");
  const selectStatusContent = `
    <p>Book Status:</p>
    <select name="book-status" class="update-book-status">
      <option value="Plan To Read">Plan To Read</option>
      <option value="Reading">Reading</option>
      <option value="Completed">Completed</option>
    </select>
  `;
  updateBookStatus.innerHTML = selectStatusContent;
  libraryBook.appendChild(updateBookStatus);

  const bookRating = document.createElement("div");
  bookRating.classList.add("rating");
  const ratingParagraph = document.createElement("p");
  ratingParagraph.innerHTML = "Book Rating:";
  bookRating.appendChild(ratingParagraph);
  const ratingStars = document.createElement("div");
  ratingStars.classList.add("rating-stars");
  const ratingContent = `
    <i class="rating__star far fa-star"></i>
    <i class="rating__star far fa-star"></i>
    <i class="rating__star far fa-star"></i>
    <i class="rating__star far fa-star"></i>
    <i class="rating__star far fa-star"></i>
  `;
  ratingStars.innerHTML = ratingContent;
  bookRating.appendChild(ratingStars);
  libraryBook.appendChild(bookRating);

  const removeBook = document.createElement("div");
  removeBook.classList.add("btn");
  const removeBookButton = document.createElement("button");
  removeBookButton.classList.add("button-32");
  removeBookButton.setAttribute("id", "remove-book");
  removeBookButton.setAttribute("type", "button");
  removeBookButton.setAttribute("role", "button");
  removeBookButton.textContent = "Remove";
  removeBook.appendChild(removeBookButton);
  libraryBook.appendChild(removeBook);
  
  const libraryBooks = document.querySelector("#library-books");
  libraryBooks.appendChild(libraryBook);

  // Add an event listener to the plus icon
  plusIcon.addEventListener("click", function(){
    // Update "Plan To Read" status to "Reading" status
    let currentStatusArray = document.querySelectorAll(".current-status");
    let updateStatusArray = Array.from(document.querySelectorAll(".update-book-status"));
    let currentStatus = currentStatusArray[bookLibrary.indexOf(book)];

    if(currentStatus.textContent === "Book Status: Plan To Read") {
      book.bookStatus = "Reading";
      currentBookStatus.innerHTML = `Book Status: ${book.bookStatus}`;
      updateStatusArray[bookLibrary.indexOf(book)].value = "Reading";

      if(plannedBooks > 1) {
        document.querySelector("#planned-books").setAttribute("value", --plannedBooks);
      } else {
        document.querySelector("#planned-books").setAttribute("value", "0");
      }
      document.querySelector("#reading-books").setAttribute("value", ++readingBooks);

    }
    storeToLocalStorage();

    let pageNumberArray = document.querySelectorAll(".library-book input");
    let pageNumber = + pageNumberArray[bookLibrary.indexOf(book)].value;
    let pageValue = 0;
    pageValue = ++ pageNumber;
    let pageValues = document.querySelectorAll(".library-book input");
    pageValues[bookLibrary.indexOf(book)].setAttribute("value", `${pageValue}`);
    book.currentPageNumber = pageValue;
    storeToLocalStorage();
  });


  // Update "select" value for the "select" element
  let setSelectValueArray = Array.from(document.querySelectorAll(".update-book-status"));
  let newSelectValue = setSelectValueArray[bookLibrary.indexOf(book)];

  let inputFieldArray = Array.from(document.querySelectorAll("#page-number"));
  let inputField = inputFieldArray[bookLibrary.indexOf(book)];
  newSelectValue.value = book.bookStatus;
  storeToLocalStorage();

  // Add event listener to input field to change book status and page number if book is being read
  inputField.addEventListener("input", () => {
    book.currentPageNumber = inputField.value;
    inputField.setAttribute("value", book.currentPageNumber);
    storeToLocalStorage();
  });

  // Add 'change' event listener to the 'select' elements to change status if book is completed
  newSelectValue.addEventListener("change", (event) => {
    if(event.target.value === "Reading"){
      book.bookStatus = event.target.value;
      currentBookStatus.innerHTML = `Book Status: ${book.bookStatus}`;

      
    } else if(event.target.value === "Completed"){
      book.bookStatus = event.target.value;
      currentBookStatus.innerHTML = `Book Status: ${book.bookStatus}`;

      book.currentPageNumber = book.totalPageNumber;
      pagesContent.innerHTML = `
      Pages: <input type="text" id="page-number" value="${book.currentPageNumber}">/${book.totalPageNumber}
    `;
    }
    storeToLocalStorage();
  });

  // Add a rating system to each book
  let individualRatingArray = Array.from(document.querySelectorAll(".rating-stars"));
  let individualRating = individualRatingArray[bookLibrary.indexOf(book)];
  let stars = Array.from(individualRating.children);
  executeRating(stars);
  storeToLocalStorage();

  // Remove book from library
  removeBookButton.addEventListener("click", function(){
    bookLibrary.splice(bookLibrary.indexOf(book), 1);
    storeToLocalStorage();
    updateLibraryGrid();
  });

  // Update the figure for total number of books
  document.querySelector("#total-books").setAttribute("value", book.total);
}

function addBookToLibraryGrid() {

  initiateBookLibrary();
  pushBookToArray();
  updateLibraryGrid();
}

// Update library grid on the page
function updateLibraryGrid () {

  resetLibraryGrid();
  initiateBookLibrary();

  bookLibrary.map(function(book){
    addBooksToLibrary(book);
    storeToLocalStorage();
  });
  
  bookLibrary.forEach((book) => {
    updateBookSummary(book);
  });

}

const inputForm = document.querySelector(".input-form");

inputForm.addEventListener("submit", function(){
event.preventDefault();
addBookToLibraryGrid();
inputForm.reset();
closePopupForm();
});

window.addEventListener("load", function(){
  libraryMessage.style.marginTop = "2vw"; 
  libraryMessageHeading.classList.add("hide");
  libraryMessageImage.classList.add("hide");
  updateLibraryGrid();
});

