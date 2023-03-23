const express = require('express');
const fs = require('fs');
const notesData = require('./db/notes.json');
const path = require('path');
const { clog } = require('./middleware/clog');
// const { event } = require('util/types');
// const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(clog);


// * ======================= Middleware ====================== * //

// Looks into Objects for nested Objects within Objects
app.use(express.urlencoded({ extended: true }));

// Parses incoming JSON data
app.use(express.json());

// Connects embedded links/resources to associated HTML files within ./public/ Directory
app.use(express.static('public'));

// * =========================================================== *

function createNewNote(newNote) {
    console.log(`dis just in: ${newNote}`);
    // console.log(`a whole new array of notes... see? ${notesObj}`);
    // const notes = notesData;

    // const notes = [];
    // notes.push(newNote);
    // add new note data to notes.json file & notes array
    notesData.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/notes.json'),
        JSON.stringify(notesData, null, 2)
    );

    // return finished code to post route for response
    return notesData;
};

function validateNote(newNote) {
    console.log('all we need is VALIDATION');
    if (!newNote.title || typeof newNote.title !== 'string') {
        return false;
    }
    if (!newNote.text || typeof newNote.text !== 'string') {
        return false;
    }
    return true;



    // res.json(notesObj);
    // console.log(notesObj);
    // renderActiveNote(notesObj);
};

// function setTimeStampId(newNote) {
//     console.log(newNote);
//     // set note id based on user input date & time
//     newNote.id = new Date();
//     // const formatNewId = newNote.id.toDateString();
//     // formatNewId = newNote.id.toTimeString().split(' ')[0];
//     console.log(newNote.id);
//     return newNote.id;
// };

// * ======================== API ROUTES ======================== *

app.get('/api/notes', (req, res) => {
    fs.readFileSync('./db/notes.json', (error, data) => {
        if (error) {
            throw error;
        } else {
            let notes = [];
            if (data) {
                notes = JSON.parse(data);
            }
            return res.json(notes);
        }
    });
});

app.post('/api/notes', (req, res) => {
    // if (error) {
    //     throw error;
    // } else {
    // let notes = [];
    // if (notesData) {
    // notes = JSON.parse(notesData);
    // }
    let note = req.body;
    notesData.push(note);
    note.id = notesData.length.toString();
    fs.writeFileSync(
        path.join(__dirname, './db/notes.json'), JSON.stringify(notesData, null, 2), (error) => {
            if (error) {
                throw error;
            }
        }
        );
        console.log("notesData: ", notesData);
        res.json(notesData);
    }
    // req.body is the object returning incoming data
    // const newNote = req.body;
    // // setTimeStampId(newNote);
    // // Validating data in req.body, else will return 400 Status back
    // if (!validateNote(newNote)) {
    //     res.status(400).send('Status 400: Input Invalid');
    // } else {
    //     const note = createNewNote(newNote);
    //     res.json(note);
    // }
);


// * ======================= HTML ROUTES ======================== *

// // Get client-side response from index.html
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });

// GET client-side response data from notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// Wildcard route & included homepage route established in case of inaccurate client requested end-point
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


// * ===================== PORT LISTENER ===================== *

// Method called for application's server to begin 'listening' for requests
app.listen(PORT, () => console.log(`app now on port ${PORT}!`));
