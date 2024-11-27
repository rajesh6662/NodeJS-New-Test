const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
if (!dotenv) {
    console.error("MongoDB URI is not defined.");
    process.exit(1);
}

// Middleware for body parsing
app.use(express.json()); // Middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

// connect to MongoDB
const dbUri = 'mongodb://localhost:27017/Node-test'; 
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Failed to connect to MongoDB", err));

// CORS headers and content-type
app.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Logging incoming request and body
app.use('/api/auth', (req, res, next) => {
    console.log("Incoming request:", req.method, req.body); // Log incoming request body
    next();
});

// Import routes
const routes = require('./routes/login.routes');
app.use('/api/auth', routes); // Prefix routes with '/api/auth'

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
