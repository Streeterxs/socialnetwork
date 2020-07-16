import mongoose, { Schema } from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';


export interface IPost extends mongoose.Document {
    author: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    likes: string[];
    comments: string[]
}

export interface IPostModel extends mongoose.Model<IPost> {
    findAuthorPosts(id: string): IPost[];
    findByAuthorIdList(ids: string[]): IPost[];
    findLoggedUserPosts(token: string): IPost[];
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
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
});

postSchema.statics.findAuthorPosts = async (id: string) => {
    const posts = await Post.find({author: id}).sort({createdAt: -1});
    return posts;
}

postSchema.statics.findByAuthorIdList = async (ids: string[]) => {
    const posts = await Post.find({author: {$in: ids}}).sort({createdAt: -1});
    return posts;
}

postSchema.statics.findLoggedUserPosts = async (token: string) => {
    const jsonPayload: any = jsonwebtoken.decode(token);
    return await Post.find({author: jsonPayload._id}).sort({createdAt: -1});
}


const Post = mongoose.model<IPost, IPostModel>('Post_SocialNetwork', postSchema);

export default Post;