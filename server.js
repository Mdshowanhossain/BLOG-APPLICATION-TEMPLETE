const express = require('express');
require('./Database/connection');
const userRouter = require('./routes/userRouter');
const blogRouter = require('./routes/blogRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs')

// <-----ROUTER---->

// app.use('/', userRouter);

app.use('/', blogRouter);
app.use('/user', userRouter);


app.listen(PORT, () => {
    console.log(`Your server is Running at ${PORT}`);
});