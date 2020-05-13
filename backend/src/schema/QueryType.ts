import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import { loadLoggedUser } from '../modules/users/UserLoader';
import { authorPostsLoader, loggedUserPosts } from '../modules/posts/PostLoader';
import userType from '../modules/users/UserType';
import PostType from '../modules/posts/PostType';
import CommentType from '../modules/comments/CommentType';
import { commentsFromPostLoader } from '../modules/comments/CommentLoader';
import { nodeField } from '../graphql/NodeDefinitions';
import { nodesField } from '../graphql/NodeDefinitions';


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
            node: nodeField,
            nodes: nodesField,
            type: GraphQLList(PostType),
            args: {
                token: {
                    type: GraphQLString
                }
            },
            resolve: (value, {token}) => {
                loggedUserPosts(token);
            }
        }
    })
});

export default QueryType;