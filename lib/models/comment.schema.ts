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
    date_created: {
        type: Date,
        default: Date.now(),
    },
});
