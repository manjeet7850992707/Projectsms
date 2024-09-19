
require('dotenv').config();  
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');  // Import the connection function
const router=require('./Routes/Route')

const app = express();
const PORT = process.env.PORT || 5000;




app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(router)

// Connect to MongoDB
connectDB();  // Call the connection function

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the Auth API');
});



// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
