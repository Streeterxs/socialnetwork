import mongoose from 'mongoose';

export interface IReply extends mongoose.Document {
    author: string;
    content: string;
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
});

const Reply = mongoose.model<IReply>('Reply', replySchema);

export default Reply