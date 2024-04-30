import { Schema } from "mongoose";

export const attorneySchema = new Schema({
    name: {
        type: String,
        required: [true, "Attorney name is required"],
    },
    position: {
        type: String,
        required: [true, "Attorney position is required"],
    },
    image_url: {
        type: String,
        required: [true, "Attorney image  is required"],
    },
    image_id: {
        type: String,
    },
});
