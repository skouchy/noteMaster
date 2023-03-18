// every html should have js file & * linked to css
// TODO: notes.js  </TO-DO>

// TODO: Check Boiler Plate?   
// TODO: Add Middleware... app.use() urlencoded, .json, and .static('public')

// TODO: 
//Create Routes to serve index.html from server
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, './public/index.html'));
});


// TODO: Finish Post functionality: 
// FORMS:
function handleAnimalSubmit(example) {
    // script.js:
        //ready to gather data & oranize as object? ==> packaged by zoo client, check here
        // send data from Form inputs to /api/notes POST endpoint
            // use fetch() to take front end data that needs to be POSTed(aka sent) to the back-end
}

// Do js files handle functionality of capturing data and printing to page?
if (yes) { //API calls using 
    fetch()
}

//* test using insomnia!