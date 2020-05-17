import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { connectionDefinitions, connectionArgs, connectionFromArray, globalIdField } from 'graphql-relay';

import userType from '../users/UserType';
import { IComment } from './CommentModel';
import { loadUser } from '../users/UserLoader';
import ReplyType, { ReplyConnection, ReplyListType } from '../reply/ReplyType';
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
            type: ReplyListType,
            resolve: (post, args) => post.replies.map(replyLoader)
        }
    }),
    interfaces: [nodeInterface]
});

export const CommentListType = new GraphQLObjectType<IComment[]>({
    name: 'CommentListType',
    description: 'Comment list type',
    fields: () => ({
        id: globalIdField('Comment'),
            Comments: {
                type: CommentConnection,
                args: connectionArgs,
                resolve: (comments, args) => connectionFromArray(comments, args)
            },
    }),
    interfaces: [nodeInterface]
});

export const {connectionType: CommentConnection} =
  connectionDefinitions({nodeType: CommentType});

export default CommentType