import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import { loadLoggedUser } from '../modules/users/UserLoader';
import { authorPostsLoader } from '../modules/posts/PostLoader';
import userType from '../modules/users/UserType';
import PostType from '../modules/posts/PostType';


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
        }
    })
});

export default QueryType;