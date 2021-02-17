const mongoose = require('mongoose');

const uri= 'mongodb://localhost/mern_crud';

mongoose.connect(uri)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));


module.exports = mongoose;