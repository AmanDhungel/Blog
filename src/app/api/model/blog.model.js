import mongoose from "mongoose";

export const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    titledesc: {
        type: String,
        required: [true, 'title Description is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
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