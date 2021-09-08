const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Blog_Application")
    .then(() => console.log('Your Connection Is Established'))
    .catch((err) => console.log(err));