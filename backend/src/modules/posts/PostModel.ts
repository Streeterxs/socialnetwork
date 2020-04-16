import mongoose, { Schema } from 'mongoose';
import { IComment } from '../comments/CommentModel';

export interface IPost extends mongoose.Document {
    author: string;
    content: string;
    likes: number;
    comments: IComment[]
}

export interface IPostModel extends mongoose.Model<IPost> {
    findAuthorPosts(token: string): IPost[];
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
    }
});

postSchema.statics.findAuthorPosts = (token: string) => {
    const posts = Post.find({author: token});
    return posts;
}

const Post = mongoose.model<IPost, IPostModel>('Post', postSchema);

export default Post;