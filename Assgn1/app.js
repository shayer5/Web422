/*********************************************************************************** 
* WEB422 – Assignment 1
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: _Sukhman Hayer____ Student ID: _143345221____ Date: __1/30/2024_
*
* Published URL: _https://lucky-blue-cuttlefish.cyclic.app/api/listings__
*********************************************************************************/





const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv').config();


// Add support for incoming JSON entities
app.use(cors());
app.use(express.json());

const ListingsDB = require('./modules/listingsDB.js');
const db = new ListingsDB();

const HTTP_PORT = 8080;
//const mongoose = require('mongoose');
//let Schema = mongoose.Schema;
//mongoose.connect('mongodb+srv://shayer5:Insignia2@senecaweb.brnjjgm.mongodb.net/sample_airbnb?retryWrites=true&w=majority')
// mongodb+srv://shayer5:Insignia2@senecaweb.brnjjgm.mongodb.net/sample_airbnb?retryWrites=true&w=majority
app.use(bodyParser.json());


db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
  app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
  });
}).catch((err)=>{
  console.log(err);
});

// Deliver the app's home page to browser clients 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Get all
app.get('/api/listings', (req, res) => {
  const { page = 1, perPage = 15, name  = ''} = req.query;
  db.getAllListings(page,perPage, name).then((listings) => {
    res.status(200).json(listings);
  }).catch((err) => {
    res.status(500).json({ message: `unable to get listings`, error: err });
  });
});

// Get one
app.get('/api/listings/:id', (req, res) => {
  db.getListingById(req.params.id).then((listing) => {
    if (!listing) {
      res.status(404).json({ message: `unable to find listing with id: ${req.params.id}` });
    } else {
      res.status(200).json(listing);
    }
  }).catch((err) => {
    res.status(500).json({ message: `unable to get listing`, error: err });
  });
});


// Post Route for adding new listing using the addNewListing method and return object with message
app.post('/api/listings', (req, res) => {
    db.addNewListing(req.body).then((newListing) => {
      res.status(201).json(newListing);
    }).catch((err) => {
      res.status(500).json({ message: `unable to add listing due to server error`, error: err });
    });
});

// Edit existing
// This route expects a JSON object in the body, e.g. { "id": 123, "firstName": "Peter", "lastName": "McIntyre" }
app.put('/api/listings/:id', (req, res) => {
  db.updateListingById(req.body, req.params.id).then((listing) => {
    if (!listing) {
      res.status(404).json({ message: `unable to find listing with id: ${req.params.id}` });
    } else {
      res.status(200).json(listing);
    }
  }).catch((err) => {
    res.status(500).json({ message: `unable to update listing`, error: err });
  });
});

// Delete item
app.delete('/api/listings/:id', (req, res) => {
  db.deleteListingById(req.params.id).then((listing) => {
    if (!listing) {
      res.status(404).json({ message: `unable to find listing with id: ${req.params.id}` });
    } else {
      res.status(204).json(listing);
    }
  }).catch((err) => {
    res.status(500).json({ message: `unable to delete listing`, error: err });
  });
});



