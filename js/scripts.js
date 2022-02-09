// Declare variables
let statusArray, radioValue,  i, currentPage;
let bookLibrary = [];

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

  if(document.querySelector("#plan-to-read").checked) {
    document.querySelector("#current-page").setAttribute("disabled", "true");
    currentPage = 0;
  }
  else if (document.querySelector("#reading").checked) {
    document.querySelector("#current-page").removeAttribute("disabled");
    currentPage = + document.querySelector("#current-page").value;
  }
  else {
    document.querySelector("#current-page").setAttribute("disabled", "true");
    currentPage = + document.querySelector("#total-pages").value;
  }
  return currentPage;
}

// Create a function to create Book Objects and push them to the array
function pushBookToArray() {

  let inputtedTitle = document.querySelector("#title").value;
  let inputtedAuthor = document.querySelector("#author").value;
  let inputtedNumberOfPages = + document.querySelector("#total-pages").value;


  let newBook = new Book (
    inputtedTitle,
    inputtedAuthor,
    collectRadioValue(), // return radioValue
    setCurrentPageNumber(), // return currentPage
    inputtedNumberOfPages,
  ); 
  
  bookLibrary.push(newBook);
  return bookLibrary;
}

//  Update library grid on the page
function updateLibraryGrid () {

  resetLibraryGrid();
  pushBookToArray();

  bookLibrary.map(function(book){
    addBooksToLibrary(book);
  });

  const collectStars = document.querySelectorAll(".rating__star");
  const ratingStars = Array.from(collectStars); // convert NodeList to an array;
  executeRating(ratingStars);

}

// Reset library grid on the page
function resetLibraryGrid() {
  const libraryGrid = document.querySelector("#library-books"); 
  libraryGrid.innerHTML = "";
}
// Display each book object in the array on the webpage
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
  currentBookStatus.innerHTML = `Book Status: ${book.bookStatus}`;
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

// Add event listeners to "open-form" and "close-form" buttons
openFormButton.addEventListener("click", openPopupForm);
closeFormButton.addEventListener("click", closePopupForm);

// Add event listeners to radio buttons to set value for current page
const planToRead = document.querySelector("#plan-to-read");
const reading = document.querySelector("#reading");
const completed = document.querySelector("#completed");

planToRead.addEventListener("click", setCurrentPageNumber);
reading.addEventListener("click", setCurrentPageNumber);
completed.addEventListener("click", setCurrentPageNumber);


const inputForm = document.querySelector(".input-form");

/**Test out addToLibrary function */
 inputForm.addEventListener("submit", function(){
  event.preventDefault();
  updateLibraryGrid();
  inputForm.reset();
  closePopupForm();
 });

