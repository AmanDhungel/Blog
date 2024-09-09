import mongoose from "mongoose";

export const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'title is required']
    },
    userId: {
        type: String,
        required: [true, 'userId is required']
    },
    images: {
        type: Array,
    }
}, {timestamps: true})

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog; 