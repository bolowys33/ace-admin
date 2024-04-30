import { CallbackError, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export const adminSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
        trim: true,
        lowercase: true,
        minlength: [8, "Username must be at least 8 characters long"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },
    firstname: {
        type: String,
        required: [true, "Firstname is required"],
    },
    lastname: {
        type: String,
        required: [true, "LastName is required"],
    },
});

adminSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            const hashPassword = await bcrypt.hash(this.password, 10);
            this.password = hashPassword;
        }
        next();
    } catch (error) {
        return next(error as CallbackError);
    }
});
