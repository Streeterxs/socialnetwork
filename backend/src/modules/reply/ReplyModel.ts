import mongoose from 'mongoose';
import { IUser } from '../users/UserModel';

export interface IReply extends mongoose.Document {
    author: string;
    content: string;
    likes: number;
    comment: string;
}

const replySchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: false,
        default: 0
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    }
});

const Reply = mongoose.model<IReply>('Reply', replySchema);

export default Reply