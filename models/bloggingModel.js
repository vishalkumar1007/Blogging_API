const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }

});
const Blog = mongoose.model("UserBlog", BlogSchema);
module.exports = Blog;