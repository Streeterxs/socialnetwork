import mongoose from 'mongoose';

export interface IReply extends mongoose.Document {
    author: string;
    content: string;
    likes: number;
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
    }
});

const Reply = mongoose.model<IReply>('Reply', replySchema);

export default Reply