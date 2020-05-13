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
        name: 'UserType',
        qlType: 'UserType',
        dbType: User,
        loader: loadUser
    },
    {
        name: 'PostType',
        qlType: 'PostType',
        dbType: Post,
        loader: postLoader
    },
    {
        name: 'CommentType',
        qlType: 'CommentType',
        dbType: Comment,
        loader: commentLoader
    },
    {
        name: 'ReplyType',
        qlType: 'ReplyType',
        dbType: Reply,
        loader: replyLoader
    }
]

export default registeredTypes;