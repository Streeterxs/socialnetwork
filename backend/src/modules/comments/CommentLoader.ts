import Comment, {IComment} from './CommentModel';

export const commentLoader = async (id: string) => {
    return await Comment.findOne({_id: id});
}

export const commentsFromPostLoader = async (postId: string) => {
    const comments = Comment.findCommentsForPost(postId);
    return comments
}