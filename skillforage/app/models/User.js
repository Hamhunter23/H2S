import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';  // For generating unique user IDs

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        userId: {
            type: String,
            default: () => uuidv4(),  // Automatically generate a unique ID
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
);



export default mongoose.models.User || mongoose.model('User', UserSchema);