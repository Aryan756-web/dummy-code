const express = require("express");

const app = express();
const PORT = 8000;

app.use(express.json());

// Import route files
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");

// Connect routes
app.use("/users", userRoutes);
app.use("/books", bookRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
});

app.listen(PORT, () => {
    console.log(`The app is listening to http://localhost:${PORT}`);
    
})