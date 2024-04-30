import { Schema } from "mongoose";

export const tokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    expires: {
        type: Date,
        required: true,
        default: Date.now() + 300000,
    },
});
