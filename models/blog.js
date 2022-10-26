const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
    
}, { timestamps: true })
const Blog = mongoose.model('Blog', blogSchema) //Die const Blog is used to comminicate with the dATAbASE#
module.exports = Blog; //Blog Exportieren