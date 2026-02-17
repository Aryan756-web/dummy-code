const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Helper function
function getBooks() {
    const filePath = path.join(__dirname, "../data/books.json");
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function saveBooks(books) {
    const filePath = path.join(__dirname, "../data/books.json");
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
}

// get all books
router.get("/", (req, res) => {
    const books = getBooks();
    res.json({
        success: true,
        data: books
    });
});

// Get books by id
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const books = getBooks();

    const book = books.find(b => b.id === id);
    if(!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }

    res.join({
        success: true,
        data: book
    });
});

// Create book
router.post("/", (req, res) => {
    const books = getBooks();

    const id = books.length > 0
        ? books[books.length - 1].id + 1
        : 1;

    const newBook = { id, ...req.body };

    book.push(newBook);
    saveBooks(books);

    res.status(201).json({
        success: true,
        data: newBook
    });
});

// update book
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const books = getBooks();

    const index = books.findIndex(b => b.id === id);
    if(index === -1) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }

    books[index] = { ...books[index], ...req.body};
    saveBooks(books);

    res.json({
        success: true,
        data: books[index]
    });
});

// delete books
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const books = getBooks();

    const index = books.findIndex(b => b.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    };

    const deletedBook = books[index];
    books.splice(index, 1);
    saveBooks(books);

    res.join({
        success: true,
        data: deletedBook
    });
});

module.exports = router;