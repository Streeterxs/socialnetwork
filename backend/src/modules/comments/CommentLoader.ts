import Comment, {IComment} from './CommentModel';
import Dataloader from 'dataloader';


const commentDataLoader = new Dataloader((keys: string[]) => Comment.find({_id: {$in: keys}}));
const commentByReplyDataLoader = new Dataloader((keys: string[]) => Comment.find({replies: {$in: keys}}));

export const commentLoader = async (id: string) => {
    const commentFounded = await commentDataLoader.load(id);
    console.log('comment founded by dataloader: ', commentFounded);
    return commentFounded;
}

export const commentLoaderByReply = async (replyId: string) => {
    const commentFounded = await commentByReplyDataLoader.load(replyId);
    return commentFounded;
}

// TODO implements DataLoader for this
export const commentsFromPostLoader = async (postId: string) => {
    const comments = Comment.findCommentsForPost(postId);
    return comments
}