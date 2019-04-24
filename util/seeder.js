const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');
const faker = require('faker');
const { mysqlUser, mysqlPass, mysqlHost, mysqlPort } = require('../config');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const fs = require('fs');

writer.pipe(fs.createWriteStream('photos10.csv'))

const createProperties = () => {
  let i = 0;
  const createNewProperty = () => {
    var randomPhotoCount = faker.random.number({min: 10, max:15});
    var photoArray = [];
    for(var i = 0; i < randomPhotoCount; i++){
      photoArray.push(`https://s3-us-west-2.amazonaws.com/sdcphotosbroveleit/large${faker.random.number( {min: 1, max:999 })}.jpg`)
    }
    return ({
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
     photos: photoArray 
   })
 }
  const helper = () => {
    let ready2Print = true;
    do {
      i++;
      if(i === 10000000){
        writer.write(createNewProperty());
      } else {
        ready2Print = writer.write(createNewProperty());
      }
    } while(i < 10000000 && ready2Print);
    if(i < 10000000){
      writer.once('drain', helper);
    }
  }
  
  helper();
}

// const createPhotos = () => {
//   var i = 1;
//   var listing = 1;
//   const createPhoto = () => {
//     return(
//       { id: i,
//         url: `https://s3-us-west-2.amazonaws.com/sdcphotosbroveleit/large${faker.random.number( {min: 1, max:999 })}.jpg`,
//         property_id: listing,
//       }
//     )
//   }

//   const helper = () => {
//     let ready2Print = true;
//     var randomPhotoCount = faker.random.number({min: 10, max:15});
//     var counter = 0;
//     do{
//       i++;
//       counter++;
//       if(counter > randomPhotoCount){
//         counter = 0;
//         listing++
//         randomPhotoCount = faker.random.number({min: 10, max:15});
//       }
//       if(listing === 10000002){
//         writer.end();
//       } else {
//         ready2Print = writer.write(createPhoto());
//       }
//       } while(listing <= 10000002 && ready2Print);
//       if(listing <= 10000002){
//         writer.once('drain', helper);
//       }
//   }

//   helper();
// }

