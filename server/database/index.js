const { Client } = require('pg')
const client = new Client({
  host: localhost,
  port: 3333,
  database: photos
})

client.connect()

const getDetails = id => Property.findAll({
  where: { id },
});

const getPhotos = id => Photo.findAll({
  attributes: ['url'],
  where: {
    property_id: id,
  },
});

module.exports = { getDetails, getPhotos };
