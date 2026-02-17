const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Helper function
function getUsers() {
    const filePath = path.join(__dirname, "../data/users.json");
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function saveUsers(users) {
    const filePath = path.join(__dirname, "../data/users.json");
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// Get all users
router.get("/", (req, res) => {
    const users = getUsers();
    res.json({
        success: true,
        data: users
    });
});

// Get user by id
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const users = getUsers();

    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    };

    res.json({
        success: true,
        data: user
    });
});

// Create users 
router.post("/", (req, res) => {
    const users = getUsers();

    const id = users.length > 0
        ? users[users.length - 1].id + 1
        : 1;

    const newUser = { id, ...req.body };

    users.push(newUser);
    saveUsers(users);

    res.status(201).json({
        success: true,
        data: newUser
    });
});

// Update users
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const users = getUsers();

    const index = users.findIndex(u => u.id === id);
    if (index === -1){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    users[index] = { ...users[index], ...req.body };
    saveUsers(users);

    res.json({
        success: true,
        data: users[index]
    });
});

// Delete user
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const users = getUsers();

    const index = users.findIndex(u => u.id === id);
    if (index === -1){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    };
    
    const deletedUser = users[index];
    users.splice(index, 1);
    saveUsers(users);

    res.json({
        success: true,
        data: deletedUser
    });
});

module.exports = router;