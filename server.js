const express = require('express');
const path = require('path');
const { dbObject } = require('./db/db.json');
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');

const app = express();
const PORT = process.env.PORT || 3001;



app.get('/api/dbObject', (req, res) => {
    // readFromFile(req.body)
    res.json(dbObject);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
