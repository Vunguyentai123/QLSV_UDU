import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    isLogged: {
        type: Boolean,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
        default: 0,
    },
});

const User = mongoose.models.User || mongoose.model('User ', UserSchema);

export default User;