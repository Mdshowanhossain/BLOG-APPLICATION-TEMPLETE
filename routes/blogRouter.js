const express = require('express');
const multer = require('multer');
const BlogSchema = require('../models/blogSchema');
require('../Database/blogConnection');
const router = express.Router();


// EJS RENDER START

// router.get('/', (req, res) => {

// const blogs = [
//     { "name": "sohan", "name": "sohan" },
//     { "name": "sohan", "name": "sohan" },
//     { "name": "sohan", "name": "sohan" },
//     { "name": "sohan", "name": "sohan" },
// ];

//     res.render('./home')
// })
router.get('/about', (req, res) => {
    res.render('./about')
})
router.get('/contact', (req, res) => {
    res.render('./contact')
})
router.get('/login', (req, res) => {
    res.render('./login')
})
router.get('/registration', (req, res) => {
    res.render('./registration')
})
router.get('/postBlog', (req, res) => {
    res.render('./postBlog')
})
router.get('/editBlog', (req, res) => {
    res.render('./editBlog')
})



// router.get('/edit', (req, res) => {
//     res.render('./editBlog')
// })
// router.get('/show', (req, res) => {
//     res.render('./Blog/show');
// });

// EJS RENDER END

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3
    }
})

router.get('/show/:slug', async (req, res) => {
    try {
        let blog = await BlogSchema.findOne({ slug: req.params.slug })
        if (blog) {
            res.render('./showBlog', { blog: blog })
        } else {
            res.redirect('/')
        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/post', upload.single('image'), async (req, res) => {
    // console.log(req.file);
    try {
        const postBlogData = new BlogSchema({
            title: req.body.title,
            author: req.body.author,
            subject: req.body.subject,
            description: req.body.description,
            image: req.file.filename,
        })
        const postBlogSave = await postBlogData.save();
        res.status(201).redirect('/');
    }
    catch (err) {
        res.status(400).send(err.message)
        console.log(err);
    }
})

router.get('/', async (req, res) => {
    const blogs = await BlogSchema.find().sort({ timeCreated: 'desc' });
    // console.log(blogs);
    try {
        if (blogs) {
            res.render('./home', { blogs: blogs })
        } else {
            res.status(400).send('There was a problem');
        }
    }
    catch (err) {
        res.status(400).send(err.message);
        console.log(err.message);
    }
})

router.get('/edit/:id', async (req, res) => {
    let blog = await BlogSchema.findById(req.params.id);
    try {
        blog = await blog.save()
        res.render('./editBlog', { blog: blog })
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message)
    }
})

router.post('/edit/:id', async (req, res) => {
    try {
        await BlogSchema.updateOne({ _id: req.params.id }, {
            $set: {
                title: req.body.title,
                subject: req.body.subject,
                author: req.body.author,
                description: req.body.description,
            }
        })
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.redirect('/edit')
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        await BlogSchema.deleteOne({ _id: req.params.id })
        res.redirect('/')

    } catch (err) {
        res.send(err.message)
        console.log(err.message)
    }
})



module.exports = router;