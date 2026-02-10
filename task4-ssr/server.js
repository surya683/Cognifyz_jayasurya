const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const localDB = [];

app.get('/', (req, res) => {
    res.render('index', { title: "Task 4 App", errors: null });
});

app.post('/submit', (req, res) => {
    const { username, email, age, password } = req.body;
    let errors = [];

    // Complex Regex for Password: 
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!username) errors.push("Username is required.");
    if (!email || !email.includes("@")) errors.push("Valid email required.");
    if (!age || age < 18) errors.push("Must be 18+.");
    
    // Server-Side check for the complex rule
    if (!password || !passwordRegex.test(password)) {
        errors.push("Password too weak (Min 8 chars, 1 Uppercase, 1 Number, 1 Symbol).");
    }

    if (errors.length > 0) {
        return res.render('index', { title: "Task 4 App", errors: errors });
    }

    // Store the data (In a real app, NEVER store plain text passwords!)
    localDB.push({ username, email, age });

    res.render('response', { 
        title: "Success", 
        name: username, 
        email: email,
        allUsers: localDB 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});