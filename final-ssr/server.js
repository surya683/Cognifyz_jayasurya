const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// Temporary Server-Side Storage (in-memory database)
// This resets every time you restart the server
const localDB = [];
// Route 1: Show the form
app.get('/', (req, res) => {
    res.render('index', { 
        title: "Task 2 Form", 
        errors: null 
    });
});

// Route 2: Handle the form submission
app.post('/submit', (req, res) => {
    const { username, email, age } = req.body;
    let errors = [];

// Server-Side Validation Logic
    if (!username || username.trim() === "") {
        errors.push("Username is required.");
    }
    if (!email || !email.includes("@")) {
        errors.push("A valid email is required.");
    }
    if (!age || age < 18) {
        errors.push("You must be at least 18 years old.");
    }
    // If there are errors, stop and send the user back to the form with messages
    if (errors.length > 0) {
        return res.render('index', { 
            title: "Task 2 Form", 
            errors: errors 
        });
    }

    // Store valid data in our temporary storage
    localDB.push({ username, email, age });
    console.log("Current Database:", localDB);

    // Render success page
    res.render('response', { 
        title: "Success", 
        name: username, 
        email: email,
        allUsers: localDB // We pass the DB to show the list grew
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});