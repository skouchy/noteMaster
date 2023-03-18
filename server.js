const express = require('express');
const fs = require('fs');
const path = require('path');
// const { event } = require('util/types');
const { notes } = require('./notes_db/db.json');
// const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');

const PORT = process.env.PORT || 3001;
const app = express();


// * Middleware *//

// Looks into Objects for nested Objects within Objects
app.use(express.urlencoded({ extended: true }));

// Parses incoming JSON data
app.use(express.json());

// Connects embedded links/resources to associated HTML files within ./public/ Directory
app.use(express.static('public'));


// function createNewNote(newNote, notes) {
//     console.log(`dis just in: ${newNote}`);
//     console.log(`a whole new array of notes... see? ${notes}`);
//  };
// function validateNote(note) {};
// function setTimeStampId(date){};

app.post('/api/notes', (req, res) => {
//     // req.body is the object returning incoming data
    const newNote = req.body;

    //     // set note id based on user input date & time
    //     newNote.id = new Date();
    //     console.log(newNote.id.toDateString());
//     console.log(newNote.id.toTimeString().split(' ')[0]);

//  // Validating data in req.body, else will return 400 Status back
// if(!validateNote(req.body)) {
    //     res.status(400).send('Status 400: Input Invalid');
    // } else {
        //     // add new note data to db.json file & notes array
        // const note = createNewNote(newNote, notes);
        res.json(newNote);
        console.log(req.body);
    // }
});

app.get('/api/notes', (req, res) => {
    let results = notes; // 'notes' origin:   const { notes } = require(./notes_db/db.json)
    
    res.json(results);
});

// Get client-side response from index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET client-side response data from notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// Wildcard route established in case of inaccurate client requested end-point
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Method called for application's server to begin 'listening' for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
