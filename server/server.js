const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/skillforge/build')));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
    // res.send('Hello World');
    res.sendFile(path.join(__dirname, '../client/skillforge/build', 'index.html'));
});

app.get('/learn', (req, res) => {
    res.send('Learning');
});

app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
});