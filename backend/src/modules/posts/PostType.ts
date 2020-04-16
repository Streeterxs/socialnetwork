import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';

import userType from '../users/UserType';
import { postLoader } from './PostLoader';
import CommentType from '../comments/CommentType';

const PostType = new GraphQLObjectType({
    name: 'PostType',
    description: 'Post type',
    fields: () => ({
        author: {
            type: userType
        },
        content: {
            type: GraphQLString,
            resolve: (post) => postLoader(post, 'content')
        },
        likes: {
            type: GraphQLInt,
            resolve: (post) => postLoader(post, 'likes')
        }
    })
})

export default PostType;