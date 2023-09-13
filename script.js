"use strict";

const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  readStatusToggle() {
    this.read = this.read ? false : true;
  }
}

function addBookToLibrary() {
  const title = document.querySelector("#book_title").value;
  const author = document.querySelector("#book_author").value;
  const pages = document.querySelector("#book_pages").value;
  const read = document.querySelector("#book_read").checked;

  myLibrary.push(new Book(title, author, pages, read));
};

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

// DOM
const showFormBtm = document.querySelector(".show-form-btn");
const modal = document.querySelector("#modal");
const addBookBtn = document.querySelector(".add-book-btn");

showFormBtm.addEventListener("click", () => {
  modal.showModal();
});

addBookBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addBookToLibrary();
  showBooks();
  modal.close();
});

// Show Books
const libraryContainer = document.querySelector(".library-container");

function showBooks() {
  libraryContainer.innerHTML = "";

  myLibrary.forEach(book => {
    // CARD LAYOUT
    const card = document.createElement("div");
    card.classList.add("card");

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card--title");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card--body");

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card--footer");

    // CARD CONTENT
    const bookTitle = document.createElement("div");
    bookTitle.textContent = `Title: ${book.title}`;
    const bookAuthor = document.createElement("div");
    bookAuthor.textContent = `Author: ${book.author}`;
    const bookPages = document.createElement("div");
    bookPages.textContent = `Page Count: ${book.pages}`;
    const bookReadBtn = document.createElement("button");
    bookReadBtn.textContent = book.read ? `Read` : `Not Read`;
    book.read ? bookReadBtn.classList.add("btn__ok") : bookReadBtn.classList.add("btn__danger");
    bookReadBtn.addEventListener("click", () => {
      book.readStatusToggle();
      showBooks();
    })
    const bookRemoveBtn = document.createElement("button")
    bookRemoveBtn.textContent = 'Remove';
    bookRemoveBtn.classList.add("btn__danger");
    bookRemoveBtn.setAttribute("data-index", `${myLibrary.indexOf(book)}`);
    bookRemoveBtn.addEventListener("click", (e) => {
      removeBookFromLibrary(e.target.attributes["data-index"].value);
      showBooks();
    });


    libraryContainer.appendChild(card);
    card.appendChild(cardTitle);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    cardTitle.appendChild(bookTitle);
    cardBody.appendChild(bookAuthor);
    cardBody.appendChild(bookPages);
    cardFooter.appendChild(bookReadBtn);
    cardFooter.appendChild(bookRemoveBtn);
  })
}

// Placeholder books
myLibrary.push(new Book("Lord of the Rings", "J.R.R Tolkien", 1178, true));
myLibrary.push(new Book("The King's Fifth", "Scott O'Dell", 272, true));
myLibrary.push(new Book("1984", "George Orwell", 328, false));
// start
document.addEventListener("DOMContentLoaded", function() {
  showBooks();
});
