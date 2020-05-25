import Comment, {IComment} from './CommentModel';

export const commentLoader = async (id: string) => {
    const commentFounded = await Comment.findOne({_id: id});
    return commentFounded;
}

export const commentLoaderByReply = async (replyId: string) => {
    const commentFounded = await Comment.findOne({replies: replyId});
    return commentFounded;
}

export const commentsFromPostLoader = async (postId: string) => {
    const comments = Comment.findCommentsForPost(postId);
    return comments
}