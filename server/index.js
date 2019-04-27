const morgan = require('morgan');
const express = require('express');
const compression = require('compression');
const db = require('./database');
const { port } = require('../config.js');

const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use('/dist', express.static('public/dist'));
app.use('/:propertyId', express.static('public'));

app.get('/api/listingGallery/:propertyId', (req, res) => {
    const propertyId = Number(req.params.propertyId);
    db.getDetailsAndPhotos(propertyId, (data)=> {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).send(data)
    })
})

app.listen(port);
