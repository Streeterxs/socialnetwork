import { loadUser } from '../modules/users/UserLoader';
import { postLoader } from '../modules/posts/PostLoader';
import { commentLoader } from '../modules/comments/CommentLoader';
import { replyLoader } from '../modules/reply/ReplyLoader';
import User from '../modules/users/UserModel';
import Post from '../modules/posts/PostModel';
import Reply from '../modules/reply/ReplyModel';
import Comment from '../modules/comments/CommentModel';

const registeredTypes = [
    {
        name: 'User',
        qlType: 'UserType',
        dbType: User,
        loader: loadUser
    },
    {
        name: 'Post',
        qlType: 'PostType',
        dbType: Post,
        loader: postLoader
    },
    {
        name: 'Comment',
        qlType: 'CommentType',
        dbType: Comment,
        loader: commentLoader
    },
    {
        name: 'Reply',
        qlType: 'ReplyType',
        dbType: Reply,
        loader: replyLoader
    }
]

export default registeredTypes;