const { Client } = require('pg')
const client = new Client({
  database: 'photos'
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

const getDetails = id => {
  client.query(`SELECT * FROM properties WHERE id = ${id}`, (err, res) => {
    if(err) {
      res.status(500);
      console.log(err)
    } else{
      res.send()
    }
  })
}

const getPhotos = id => {
  client.query(`SELECT * FROM listing_photos WHERE property_id = ${id}`, (err, res) => {
    if(err){
      res.status(500);
      console.log(err);
    } else {
      res.send();
    }
  })
}

module.exports = { getDetails, getPhotos };
