const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// 1. Temporary Server-Side Storage (in-memory database)
const localDB = [];

app.get('/', (req, res) => {
    // Render the form, passing an empty error object initially
    res.render('index', { title: "Task 2 Form", errors: null });
});

app.post('/submit', (req, res) => {
    const { username, email, age } = req.body;
    let errors = [];

    // 2. Server-Side Validation Logic
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

    // 3. Store valid data in our temporary storage
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});