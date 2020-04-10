import Comment, {IComment} from './CommentModel';

export const commentLoader = (comment: IComment, field: keyof IComment) => {
    return comment[field];
}