import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { connectionDefinitions, connectionArgs, connectionFromArray, globalIdField } from 'graphql-relay';

import userType from '../users/UserType';
import { IComment } from './CommentModel';
import { loadUser } from '../users/UserLoader';
import ReplyType, { ReplyConnection } from '../reply/ReplyType';
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
            resolve: (comment) => comment.likes.length
        },
        userHasLiked: {
            type: GraphQLBoolean,
            resolve: (comment, {user}) => comment.likes.includes(user.id)
        },
        replies: {
            type: ReplyConnection,
            args: connectionArgs,
            resolve: (comment, args) => {
                    return connectionFromArray(
                        comment.replies.map(replyLoader),
                    args
                )
            }
        }
    }),
    interfaces: [nodeInterface]
});

export const {connectionType: CommentConnection} =
  connectionDefinitions({nodeType: CommentType});

export default CommentType