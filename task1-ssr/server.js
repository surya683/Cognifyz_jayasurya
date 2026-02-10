const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// 1. Route to serve the initial HTML form
app.get('/', (req, res) => {
    res.render('index', { title: "User Input Form" });
});

// 2. Route to handle form submission
app.post('/submit', (req, res) => {
    const userName = req.body.username;
    const userEmail = req.body.email;

    res.render('response', { 
        title: "Submission Received",
        name: userName,
        email: userEmail
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});