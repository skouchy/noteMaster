const express = require('express');
const { dbObject } = require('./db/db');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/dbObject', (req, res) => {
    res.json(dbObject);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
