// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());


// routes
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));

// simple root route
app.get('/', (req, res) => res.json({ message: 'Book Catalog API is running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
