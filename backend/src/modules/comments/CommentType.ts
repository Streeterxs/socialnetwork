import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import { commentLoader } from './CommentLoader';
import userType from '../users/UserType';
import ReplyType from '../reply/ReplyType';

const CommentType = new GraphQLObjectType({
    name: 'CommentType',
    description: 'Comment type',
    fields: () => ({
        author: {
            type: userType
        },
        content: {
            type: GraphQLString,
            resolve: (comment) => commentLoader(comment, 'content')
        },
        likes: {
            type: GraphQLInt,
            resolve: (comment) => commentLoader(comment, 'likes')
        },
        replies: {
            type: GraphQLList(ReplyType)
        }
    })
});

export default CommentType