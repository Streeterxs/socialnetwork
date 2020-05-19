import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { globalIdField, connectionDefinitions, connectionArgs, connectionFromArray } from 'graphql-relay';

import userType from '../users/UserType';
import { IReply } from './ReplyModel';
import { loadUser } from '../users/UserLoader';
import { nodeInterface } from '../../graphql/NodeDefinitions';

const ReplyType = new GraphQLObjectType<IReply>({
    name: 'ReplyType',
    description: 'Reply type',
    fields: () => ({
        id: globalIdField('Reply'),
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
            resolve: (reply) => reply.likes.length
        },
        userHasLiked: {
            type: GraphQLBoolean,
            resolve: (reply, args, {user}) => reply.likes.includes(user.id)
        }
    }),
    interfaces: [nodeInterface]
});

export const {connectionType: ReplyConnection} =
  connectionDefinitions({nodeType: ReplyType});

export default ReplyType