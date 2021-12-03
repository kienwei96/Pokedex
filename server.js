const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const app = express();
const Pokemon = require('./models/pokemon')
const methodOverride = require("method-override");

//set up body-parser middleware
app.use(express.urlencoded())
//include the method-override package
app.use(methodOverride("_method"));

app.set('view engine','ejs')


// -------------SET ROUTES---------------

// CREATE-------------------------------
// create new pokemon page
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs');
});

// SAVE---------------------------------
app.post('/pokemon', (req, res) => {
    req.body.id= parseInt(Pokemon[Pokemon.length-1].id) + 1
    req.body.type = req.body.type.split(",")
    Pokemon.push(req.body)
    console.log(req.body)
    res.redirect('/pokemon')
});

// EDIT
app.get('/pokemon/:id/edit', (req, res) => {
    const { id } = req.params;
    res.render('edit.ejs', { data: Pokemon[id] , index:id});
});

// UPDATE
app.put('/pokemon/:id/:index', (req, res) => {
    const { id, index } = req.params
    req.body.id=id
    req.body.type = req.body.type.split(",")
    Pokemon[index]=req.body
    console.log(req.body.id)
    res.redirect('/pokemon')
});


// DELETE-------------------------------------------
app.delete('/pokemon/:id', (req, res) => {
    const { id } = req.params;
    console.log(Pokemon.splice(id,1));
    res.redirect('/pokemon');
})

// SHOW------------------------------
app.get('/pokemon/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    res.render('show.ejs', { data: Pokemon[id] });
});

// INDEX-------------------------------------

app.get('/pokemon', (req, res) => {

    res.render('index.ejs', { data: Pokemon })
});

app.get('/', (req, res) => {

    res.redirect('/pokemon');
});

app.listen(PORT, () => {
    console.log(`port ${PORT} is connected...`);
})