const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Blog_Application")
    .then(() => console.log('Your blog Connection Is Established'))
    .catch((err) => console.log(err))