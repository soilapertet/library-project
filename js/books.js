class Book {
  constructor (
    name,
    author,
    totalPageNumber,
    currentPageNumber,
    bookStatus,
  )
  {
    this.name = name;
    this.author = author;
    this.totalPageNumber = totalPageNumber;
    this.currentPageNumber = currentPageNumber;
    this.bookStatus = bookStatus;
  }
}

export default Book;