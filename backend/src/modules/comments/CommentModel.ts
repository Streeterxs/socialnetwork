import mongoose, { mongo } from 'mongoose';

import { IUser } from '../users/UserModel';
import { IReply } from '../reply/ReplyModel';

export interface IComment extends mongoose.Document {
    author: IUser,
    content: string,
    likes: number,
    replies: IReply[]
}

const commentSchema = new mongoose.Schema({
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
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
});

const Comment = mongoose.model<IComment>('Model', commentSchema);

export default Comment;
