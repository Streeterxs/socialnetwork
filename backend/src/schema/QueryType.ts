import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';

import { postLoader, postsLoaderByAuthors } from '../modules/posts/PostLoader';
import userType, { PostConnection } from '../modules/users/UserType';
import { nodeField } from '../graphql/NodeDefinitions';
import { nodesField } from '../graphql/NodeDefinitions';
import { IUser } from '../modules/users/UserModel';


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
            type: PostConnection,
            resolve: async (value, args, {user}) => postsLoaderByAuthors([user._id, ...user.friends])
        }
    })
});

export default QueryType;