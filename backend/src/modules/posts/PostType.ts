import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { connectionDefinitions, connectionArgs, connectionFromArray, globalIdField } from 'graphql-relay';

import userType from '../users/UserType';
import { IPost } from './PostModel';
import { CommentConnection } from '../comments/CommentType';
import { commentLoader } from '../comments/CommentLoader';
import { loadUser } from '../users/UserLoader';
import { nodeInterface } from '../../graphql/NodeDefinitions';

const PostType = new GraphQLObjectType<IPost>({
    name: 'PostType',
    description: 'Post type',
    fields: () => ({
        id: globalIdField('Post'),
        author: {
            type: userType,
            resolve: async (post) => await loadUser(post.author)
        },
        content: {
            type: GraphQLString,
            resolve: (post) => post.content
        },
        likes: {
            type: GraphQLInt,
            resolve: (post) => post.likes.length
        },
        userHasLiked: {
            type: GraphQLBoolean,
            resolve: (post, args, {user}) => post.likes.includes(user.id)
        },
        createdAt: {
            type: GraphQLString,
            resolve: (post) => post.createdAt
        },
        updatedAt: {
            type: GraphQLString,
            resolve: (post) => post.updatedAt
        },
        comments: {
            type: CommentConnection,
            args: connectionArgs,
            resolve: (post, args) => {
                    return connectionFromArray(
                        post.comments.map(commentLoader),
                    args
                )
            }
        }
    }),
    interfaces: [nodeInterface]
});

export const PostListType = new GraphQLObjectType<IPost[]>({
    name: 'PostListType',
    description: 'Post List type',
    fields: () => ({
        id: globalIdField('Post'),
            posts: {
                type: PostConnection,
                args: connectionArgs,
                resolve: (posts, args) => connectionFromArray(posts, args)
            },
    }),
    interfaces: [nodeInterface]
});

export const {connectionType: PostConnection} =
        connectionDefinitions({nodeType: PostType});

export default PostType;