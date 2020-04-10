import mongoose from 'mongoose';
import { IUser } from '../users/UserModel';

export interface IReply extends mongoose.Document {
    author: IUser;
    content: string;
    likes: number;
}

const replySchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: false,
        default: 0
    }
});

const Reply = mongoose.model<IReply>('Model', replySchema);

export default Reply