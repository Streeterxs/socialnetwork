import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { replyLoader } from './ReplyLoader';
import userType from '../users/UserType';

const ReplyType = new GraphQLObjectType({
    name: 'ReplyType',
    description: 'Reply type',
    fields: () => ({
        author: {
            type: userType,
        },
        content: {
            type: GraphQLString,
            resolve: (reply) => replyLoader(reply, 'content')
        },
        likes: {
            type: GraphQLInt,
            resolve: (reply) => replyLoader(reply, 'likes')
        },
        comment: {
            type: GraphQLString,
            resolve: (reply) => replyLoader(reply, 'comment')
        }
    })
});

export default ReplyType