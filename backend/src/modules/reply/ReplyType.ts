import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import userType from '../users/UserType';
import { IReply } from './ReplyModel';
import { loadUser } from '../users/UserLoader';
import { nodeInterface } from '../../graphql/NodeDefinitions';

const ReplyType = new GraphQLObjectType<IReply>({
    name: 'ReplyType',
    description: 'Reply type',
    fields: () => ({
        author: {
            type: userType,
            resolve: (reply) => loadUser(reply.author)
        },
        content: {
            type: GraphQLString,
            resolve: (reply) => reply.content
        },
        likes: {
            type: GraphQLInt,
            resolve: (reply) => reply.likes
        }
    }),
    interfaces: [nodeInterface]
});

export default ReplyType