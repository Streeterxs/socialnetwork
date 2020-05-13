import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { replyLoader } from './ReplyLoader';
import userType from '../users/UserType';
import { IReply } from './ReplyModel';

const ReplyType = new GraphQLObjectType<IReply>({
    name: 'ReplyType',
    description: 'Reply type',
    fields: () => ({
        author: {
            type: userType,
        },
        content: {
            type: GraphQLString,
            resolve: (reply) => reply.content
        },
        likes: {
            type: GraphQLInt,
            resolve: (reply) => reply.likes
        }
    })
});

export default ReplyType