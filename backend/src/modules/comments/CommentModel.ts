import mongoose, { mongo } from 'mongoose';

export interface IComment extends mongoose.Document {
    author: string,
    content: string,
    likes: string[],
    replies: string[]
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
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }]
}, {
    timestamps: true
});

commentSchema.statics.findCommentsForPost = async (postId: string) => {
    const commentsOfPost = await Comment.find({post: postId}).sort({createdAt: 1});
    return commentsOfPost;
};

const Comment = mongoose.model<IComment, ICommentModel>('Comment', commentSchema);

export default Comment;
