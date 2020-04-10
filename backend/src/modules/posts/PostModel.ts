import mongoose, { Schema } from 'mongoose';
import { IUser } from '../users/UserModel';
import { IComment } from '../comments/CommentModel';

export interface IPost extends mongoose.Document {
    author: IUser;
    content: string;
    likes: number;
    comments: IComment[]
}

const postSchema = new mongoose.Schema({
    author: {
        type: Schema.Types.ObjectId,
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
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

const Post = mongoose.model<IPost>('Model', postSchema);

export default Post;