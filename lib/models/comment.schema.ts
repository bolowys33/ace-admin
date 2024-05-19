import { Schema } from "mongoose";

export const commentSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
    date_created: {
        type: Date,
        default: Date.now(),
    },
});
