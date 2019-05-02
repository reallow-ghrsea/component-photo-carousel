/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
const faker = require('faker');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();
const fs = require('fs');

writer.pipe(fs.createWriteStream('photos-final.csv'));

const createProperties = () => {
  let i = 0;
  const createNewProperty = () => ({
    id: i,
    name: faker.address.streetAddress(),
    price: faker.random.number({
      min: 500000,
      max: 30000000,
    }),
    bed_count: faker.random.number({
      min: 2,
      max: 8,
    }),
    bath_count: faker.random.number({
      min: 1,
      max: 7,
    }),
    sq_ft: faker.random.number({
      min: 1000,
      max: 30000,
    }),
  });
  const helper = () => {
    let ready2Print = true;
    do {
      i += 1;
      if (i === 10000001) {
        writer.write(createNewProperty());
      } else {
        ready2Print = writer.write(createNewProperty());
      }
    } while (i < 10000001 && ready2Print);
    if (i < 10000001) {
      writer.once('drain', helper);
    }
  };

  helper();
};

const createPhotos = () => {
  let i = 1;
  let listing = 1;
  const createPhoto = () => (
    {
      id: i,
      url: `https://s3-us-west-2.amazonaws.com/sdcphotosbroveleit/large${faker.random.number({ min: 1, max: 999 })}.jpg`,
      property_id: listing,
    }
  );

  const helper = () => {
    let ready2Print = true;
    let randomPhotoCount = faker.random.number({ min: 10, max: 15 });
    let counter = 0;
    do {
      i += 1;
      counter += 1;
      if (counter > randomPhotoCount) {
        counter = 0;
        listing += 1;
        randomPhotoCount = faker.random.number({ min: 10, max: 15 });
      }
      if (listing === 10000001) {
        writer.end();
      } else {
        ready2Print = writer.write(createPhoto());
      }
    } while (listing < 10000001 && ready2Print);
    if (listing < 10000001) {
      writer.once('drain', helper);
    }
  };

  helper();
};

createPhotos();