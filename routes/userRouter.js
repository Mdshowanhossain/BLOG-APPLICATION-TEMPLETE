const express = require('express');
const bcrypt = require('bcryptjs');
const userSchema = require('../models/usersSchema')
const router = express.Router()

// router.get('/', (req, res) => {
//     res.render('registration')
// })

// router.get('/login', (req, res) => {
//     res.render('login')
// })

// router.get('/home', (req, res) => {
//     res.render('home')
// })

router.post('/registration', async (req, res) => {
    try {
        const password = req.body.password;
        const cPassword = req.body.cPassword
        if (password === cPassword) {
            const userPostData = new userSchema({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                cPassword: req.body.cPassword,
                address: req.body.address,
                subject: req.body.subject,
                mobilenumber: req.body.mobilenumber,
                age: req.body.age,
            })
            const saveUserData = await userPostData.save()
            // res.send(saveUserData);
            res.status(201).redirect('/login')
        }
        else {
            res.status(400).send('Password Are Not Matched')
        }
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})


router.post('/login', async (req, res) => {
    try {
        const userEmail = req.body.email;
        // const userPassword = req.body.password;

        // console.log(userEmail, userPassword);
        const userPassword = req.body.password;
        const findUserData = await userSchema.findOne({ userEmail: userEmail })

        console.log(findUserData);
        const matchingPassword = bcrypt.compare(userPassword, findUserData.password)
        if (matchingPassword) {
            res.redirect('/postBlog')
        }
        else {
            res.status(400).send('Invalid Email Address');
        }
    }
    catch (err) {
        res.status(400).send(err.message)
        console.log(err.message);
    }
})
module.exports = router