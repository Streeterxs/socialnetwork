import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import userType from '../users/UserType';
import { IComment } from './CommentModel';

const CommentType = new GraphQLObjectType<IComment>({
    name: 'CommentType',
    description: 'Comment type',
    fields: () => ({
        author: {
            type: userType
        },
        content: {
            type: GraphQLString,
            resolve: (comment) => comment.content
        },
        likes: {
            type: GraphQLInt,
            resolve: (comment) => comment.likes
        }
    })
});

export default CommentType