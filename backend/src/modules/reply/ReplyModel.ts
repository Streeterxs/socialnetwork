import mongoose from 'mongoose';

export interface IReply extends mongoose.Document {
    author: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    likes: string[];
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
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

const Reply = mongoose.model<IReply>('Reply_SocialNetwork', replySchema);

export default Reply