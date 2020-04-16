import mongoose, { mongo } from 'mongoose';

import { IUser } from '../users/UserModel';
import { IReply } from '../reply/ReplyModel';

export interface IComment extends mongoose.Document {
    author: string,
    content: string,
    likes: number,
    post: string
}

export interface ICommentModel extends mongoose.Model<IComment> {
    findCommentsForPost(postId: string): IComment[]
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

commentSchema.statics.findCommentsForPost = async (postId: string) => {
    const commentsOfPost = await Comment.find({post: postId});
    return commentsOfPost;
};

const Comment = mongoose.model<IComment, ICommentModel>('Comment', commentSchema);

export default Comment;
