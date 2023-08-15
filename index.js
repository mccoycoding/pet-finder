// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

app.use(express.static('public'))

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.sendFile(__dirname + '/index.html')
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.send(pets);
});

// get pet by owner with query string
app.get('/api/v1/owners/:owner', (req, res) => {
    // get the owner from the request
    const {owner} = req.params;

    // find the pet in the pets array
    const pet = pets.filter(pet => pet.owner.toLowerCase() === owner.toLowerCase());

    // send the pet as a response
    res.send(pet);
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the route parameter
    const { name } = req.params;

    console.log(name);
    
    // find the pet in the pets array
    const pet = pets.find(pet => pet.name.toLowerCase() === name.toLowerCase());
    // send the pet as a response
    res.send(pet);
});





app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});

module.exports = app;