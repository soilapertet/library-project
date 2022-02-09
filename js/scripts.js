// Declare variables
let statusArray, radioValue,  i;
let bookLibrary = [];

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
  libraryMessage.style.marginTop = "2vw"; // Change the value of margin-top to 2vw 
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

openFormButton.addEventListener("click", openPopupForm);

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

// Create a function to create Book Objects and push them to the array
function pushBookToArray() {

  // Collect data from the form
  let inputtedTitle = document.querySelector("#title").value;
  let inputtedAuthor = document.querySelector("#author").value;
  let inputtedCurrentPage = + document.querySelector("#current-page").value;
  let inputtedNumberOfPages = + document.querySelector("#total-pages").value;

  // Create Book objects using the Book class function
  let newBook = new Book (
    inputtedTitle,
    inputtedAuthor,
    collectRadioValue(),
    inputtedCurrentPage,
    inputtedNumberOfPages,
  ); 
  
  bookLibrary.push(newBook);
  console.log(bookLibrary);
  return bookLibrary;
}

//  Update library grid on the page
function updateLibraryGrid () {

  resetLibraryGrid();
  pushBookToArray();

  // Loop through array and perform function on each object
  bookLibrary.map(function(book){
    addBooksToLibrary(book);
  });
}

// Reset library grid on the page
function resetLibraryGrid() {
  const libraryGrid = document.querySelector("#library-books"); 
  libraryGrid.innerHTML = "";
}

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
  currentBookStatus.innerHTML = `Current Book Status: ${book.bookStatus}`;
  libraryBook.appendChild(currentBookStatus);

  const bookPages = document.createElement("div");
  bookPages.classList.add("book-pages");
  const pages = document.createElement("p");
  pages.innerHTML = `Pages: ${book.currentPageNumber}/${book.totalPageNumber}`;
  bookPages.appendChild(pages);
  const icon = document.createElement("i");
  icon.classList.add("fas","fa-plus-circle","increase-page");
  bookPages.appendChild(icon);
  libraryBook.appendChild(bookPages);


  const updateBookStatus = document.createElement("div");
  updateBookStatus.classList.add("status");
  
  const selectStatusContent = `
    <p>Book Status:</p>
    <select name="book-status">
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
}


const inputForm = document.querySelector(".input-form");

/**Test out addToLibrary function */
 inputForm.addEventListener("submit", function(){
  event.preventDefault();
  updateLibraryGrid();
  inputForm.reset();
  closePopupForm();
 });
 
