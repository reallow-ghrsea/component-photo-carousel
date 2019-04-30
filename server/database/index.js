/* eslint-disable no-console */
const { Pool } = require('pg');

const pool = new Pool({
  database: 'photos',
  port: 5432,
  host: 'localhost',
  user: 'rorybroves',
  password: '',
});

pool.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

const getDetailsAndPhotos = (id, callback) => {
  console.log(id);
  const details = pool.query(`SELECT * FROM properties WHERE id = ${id}`)
    .then(res => res.rows[0])
    .catch(e => console.log(e.stack));

  const photos = pool.query(`SELECT * FROM listing_photos WHERE property_id =${id}`)
    .then(res => res.rows)
    .catch(e => console.log(e.stack));

  Promise.all([details, photos]).then((values) => {
    callback(values);
  });
};

module.exports = { getDetailsAndPhotos };
