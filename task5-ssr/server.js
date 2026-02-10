const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Middleware to parse BOTH standard forms and JSON API requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // <--- NEW: Allows server to read JSON data

// Our Temporary Database
let localDB = [];

// 1. Render the HTML Page (The "Shell")
app.get('/', (req, res) => {
    res.render('index', { title: "Task 5: API", errors: null });
});

/* --- RESTful API ENDPOINTS --- */

// 2. GET Endpoint: Returns the list of users as JSON
app.get('/api/users', (req, res) => {
    res.json(localDB); // Sends raw data array, not an HTML page
});

// 3. POST Endpoint: Receives JSON data and saves it
app.post('/api/users', (req, res) => {
    const { username, email, age, password } = req.body;
    
    // Basic Server Validation
    if (!username || !email || !age || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newUser = { username, email, age }; // Don't send password back
    localDB.push(newUser);
    
    // Return the new user + success status
    res.status(201).json({ message: "User created!", user: newUser });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});