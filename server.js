const express = require('express');
const fs = require('fs');
const path = require('path');

const notesData = require('./db/notes.json');
const { clog } = require('./middleware/clog'); // helpful server-side terminal logging aid
const app = express();

const PORT = process.env.PORT || 3001;


// * ======================= Middleware ====================== * //

app.use(clog);

// Looks into Objects for nested Objects within Objects
app.use(express.urlencoded({ extended: true }));

// Parses incoming JSON data
app.use(express.json());

// Connects embedded links/resources to associated HTML files within ./public/ Directory
app.use(express.static('public'));


// * ======================== API ROUTES ======================== *

app.get('/api/notes', (req, res) => {
    // ASYNC call from index.js:renderNoteList() awaiting response 
    fs.readFile('./db/notes.json', (error, data) => {
        if (error) {
            throw error;
        } else {
            let notes = [];
            if (data) {
                notes = JSON.parse(data);
            }
            // 
            return res.json(notes);
        }
    });
});

app.post('/api/notes', (req, res) => {
    let note = req.body;
    notesData.push(note);
    note.id = notesData.length.toString();
    fs.writeFileSync(
        path.join(__dirname, './db/notes.json'), JSON.stringify(notesData, null, 2), (error) => {
            if (error) {
                throw error;
            }
        });
    console.log("notesData: ", notesData);
    res.json(notesData);
});


// * ======================= HTML ROUTES ======================== *

// GET client-side response data from notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// Wildcard & included homepage routes established in case of inaccurate client requested end-point
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


// * ===================== PORT LISTENER ===================== *

// Method called for server to begin 'listening' for requests 
app.listen(PORT, () => console.log(`app now on port ${PORT}!`));
