import Comment, {IComment} from './CommentModel';

export const commentLoader = (comment: IComment, field: keyof IComment) => {
    return comment[field];
}

export const commentsFromPostLoader = async (postId: string) => {
    const comments = Comment.findCommentsForPost(postId);
    return comments
}