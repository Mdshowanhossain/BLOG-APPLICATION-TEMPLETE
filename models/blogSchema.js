const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');


mongoose.plugin(slug);

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
    },
    author: {
        type: String,
        require: true,
        trim: true,
    },
    description: {
        type: String,
        require: true,
        trim: true,
    },
    image: {
        type: String,
        default: 'https://i.postimg.cc/qR002B2p/bg.jpg',
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true,
        slug_padding_size: 2,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

const userSchema = new mongoose.model('blog', BlogSchema);

module.exports = userSchema;