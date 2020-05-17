import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';

import { postLoader, postsLoaderByAuthors } from '../modules/posts/PostLoader';
import userType from '../modules/users/UserType';
import { nodeField } from '../graphql/NodeDefinitions';
import { nodesField } from '../graphql/NodeDefinitions';
import { PostListType } from '../modules/posts/PostType';


const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'General QueryType',
    fields: () => ({
        node: nodeField,
        nodes: nodesField,
        myself: {
            type: userType,
            resolve: (value, args, {user}) => {
                return user;
            }
        },
        myPosts: {
            type: PostListType,
            resolve: async (value, args, context) => {
                const postList = await postsLoaderByAuthors([context.user.id, ...context.user.friends]);
                return postList;
            }
        },
    })
});

export default QueryType;