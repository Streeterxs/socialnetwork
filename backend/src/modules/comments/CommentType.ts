import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { connectionDefinitions, connectionArgs, connectionFromArray, globalIdField } from 'graphql-relay';

import userType from '../users/UserType';
import { IComment } from './CommentModel';
import { loadUser } from '../users/UserLoader';
import ReplyType from '../reply/ReplyType';
import { replyLoader } from '../reply/ReplyLoader';
import { nodeInterface } from '../../graphql/NodeDefinitions';

const CommentType = new GraphQLObjectType<IComment>({
    name: 'CommentType',
    description: 'Comment type',
    fields: () => ({
        id: globalIdField('Comment'),
        author: {
            type: userType,
            resolve: (comment) => loadUser(comment.author)
        },
        content: {
            type: GraphQLString,
            resolve: (comment) => comment.content
        },
        likes: {
            type: GraphQLInt,
            resolve: (comment) => comment.likes
        },
        replies: {
            type: ReplyConnection,
            args: connectionArgs,
            resolve: (post, args) => connectionFromArray(
                post.replies.map(replyLoader),
                args
            )
        }
    }),
    interfaces: [nodeInterface]
});

const {connectionType: ReplyConnection} =
  connectionDefinitions({nodeType: ReplyType});

export default CommentType