const axios = require('axios');

var photos = [];

const getPhotos = () => {
    let output = [];
    axios.get('https://api.unsplash.com/photos/random/?client_id=7cff5d5661729bbdcb3485b8407211a26af597b3b57d7e312d19e6350abfca7b&count=30')
        .then( (result) => {result.data.forEach( (photo) => { 
                output.push(photo.urls.raw);
                console.log(photos);
            })
    })
    return output;
}

getPhotos();