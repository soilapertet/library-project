// Declare variables
let statusArray, radioValue,  i, currentPage, pageValue, bookLibrary;

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

initiateBookLibrary();

// Class function
class Book {
  constructor (
    title,
    author,
    bookStatus,
    currentPageNumber,
    totalPageNumber,
  )
  {
    this.title = title;
    this.author = author;
    this.bookStatus = bookStatus;
    this.currentPageNumber = currentPageNumber;
    this.totalPageNumber = totalPageNumber;
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


// Loop through the NodeList and checked which radio button is checked
function collectRadioValue () {

  statusArray = document.querySelectorAll("#book-status input"); 

  for(i = 0; i < statusArray.length; i++) {
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


  let book = new Book (
    inputtedTitle,
    inputtedAuthor,
    collectRadioValue(), // return radioValue
    setCurrentPageNumber(), // return currentPage
    inputtedNumberOfPages,
  ); 

  bookLibrary.push(book);
  return bookLibrary;
}

// Function for rating the books
function executeRating(stars) {

  const starClassActive = "rating__star fas fa-star";
  const starClassInactive = "rating__star far fa-star";
  const starsLength = stars.length;
  let j;
  stars.map(function(star) {
    star.onclick = function() {
      // set j to the value of the index of the star clicked
      j = stars.indexOf(star); 

      // Check if the star is "active"/"inactive"
      if (star.className === starClassInactive) {
        for (j; j >= 0; --j) {
          stars[j].className = starClassActive; // make the "inactive" stars "active"; increase rating
        } 
      } 
      else {
        for (j; j < starsLength; ++j) {
          stars[j].className = starClassInactive; // make the "active" stars inactive; decrease rating
        }
      }
    };
  });
}

// Update library grid on the page
function updateLibraryGrid () {

  resetLibraryGrid();
  pushBookToArray();

  bookLibrary.map(function(book){
    addBooksToLibrary(book);
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
  // Add an event listener to the plus icon
  plusIcon.addEventListener("click", function(){
    // Update "Plan To Read" status to "Reading" status
    let currentStatusArray = document.querySelectorAll(".current-status");
    currentStatusArray.forEach(function(currentStatus){
      if(currentStatus.textContent === "Book Status: Plan To Read") {
        book.bookStatus = "Reading";
        currentBookStatus.innerHTML = `Book Status: ${book.bookStatus}`;

        let updateStatusArray = Array.from(document.querySelectorAll(".update-book-status"));
        updateStatusArray[bookLibrary.indexOf(book)].value = "Reading";
      }
    });

    let pageNumberArray = document.querySelectorAll(".library-book input");
    let pageNumber = + pageNumberArray[bookLibrary.indexOf(book)].value;
    let pageValue = 0;
    pageValue = ++ pageNumber;
    let pageValues = document.querySelectorAll(".library-book input");
    pageValues[bookLibrary.indexOf(book)].setAttribute("value", `${pageValue}`);
    book.currentPageNumber = pageValue;
  });

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
  const ratingContent = `
    <p>Book Rating:</p>
    <i class="rating__star far fa-star"></i>
    <i class="rating__star far fa-star"></i>
    <i class="rating__star far fa-star"></i>
    <i class="rating__star far fa-star"></i>
    <i class="rating__star far fa-star"></i>
  `;
  bookRating.innerHTML = ratingContent;
  bookRating.addEventListener("click", function(){
    const collectStars = document.querySelectorAll(".rating__star");
    const ratingStars = Array.from(collectStars); // convert NodeList to an array;
    executeRating(ratingStars);
  
  })
  libraryBook.appendChild(bookRating);

  const removeBook = document.createElement("div");
  removeBook.classList.add("btn");
  
  const removeBookButton = `
    <button class="button-32" id="remove-button">Remove</button>
  `;

  removeBook.innerHTML = removeBookButton;
  libraryBook.appendChild(removeBook);

  const libraryBooks = document.querySelector("#library-books");
  libraryBooks.appendChild(libraryBook);

  // Update "select" value for the "select" element
  let setSelectValueArray = Array.from(document.querySelectorAll(".update-book-status"));
  setSelectValueArray[bookLibrary.indexOf(book)].value = book.bookStatus;


  // Add 'change' event listener to the 'select' elements to change status if book is completed
  setSelectValueArray.map(function(item){
    item.addEventListener("change", (event) => {
      if(event.target.value === "Completed"){
        book.bookStatus = event.target.value;
        console.log(book.bookStatus)
        currentBookStatus.innerHTML = `Book Status: ${book.bookStatus}`;

        book.currentPageNumber = book.totalPageNumber;
        pagesContent.innerHTML = `
        Pages: <input type="text" id="page-number" value="${book.currentPageNumber}">/${book.totalPageNumber}
      `;
      }
    });
  });

}

const inputForm = document.querySelector(".input-form");

/**Test out addToLibrary function */
 inputForm.addEventListener("submit", function(){
  event.preventDefault();
  updateLibraryGrid();
  inputForm.reset();
  closePopupForm();
 });

