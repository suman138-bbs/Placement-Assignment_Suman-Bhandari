import mongoose, { modelNames } from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true,'title is required']
    },
    description: {
        type: String,
        required :[true,'description is required']
    },
    size: {
        type: Number,
        required: [true,"size shouldn't be more than 20" ]
    }

}, { timestamps: true })

export default mongoose.model("Posts", postSchema);