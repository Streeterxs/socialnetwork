import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import { loadLoggedUser } from '../modules/users/UserLoader';
import { authorPostsLoader } from '../modules/posts/PostLoader';
import userType from '../modules/users/UserType';
import PostType from '../modules/posts/PostType';
import CommentType from '../modules/comments/CommentType';
import { commentsFromPostLoader } from '../modules/comments/CommentLoader';


const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'General QueryType',
    fields: () => ({
        loggedUser: {
            type: userType,
            args: {
                token: {
                    type: GraphQLString
                }
            },
            resolve: (value, {token}) => loadLoggedUser(token)
        },
        myPosts: {
            type: GraphQLList(PostType),
            args: {
                token: {
                    type: GraphQLString
                }
            },
            resolve: ({token}) => authorPostsLoader(token)
        },
        commentsOfPost: {
            type: GraphQLList(CommentType),
            args: {
                postId: {
                    type: GraphQLString
                }
            },
            resolve: ({postId}) => commentsFromPostLoader(postId)
        }
    })
});

export default QueryType;