import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';

import { postsLoaderByAuthors } from '../modules/posts/PostLoader';
import userType from '../modules/users/UserType';
import { nodeField } from '../graphql/NodeDefinitions';
import { nodesField } from '../graphql/NodeDefinitions';
import { PostConnection } from '../modules/posts/PostType';
import { connectionArgs, connectionFromArray } from 'graphql-relay';


const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'General QueryType',
    fields: () => ({
        node: nodeField,
        nodes: nodesField,
        myself: {
            type: userType,
            resolve: (value, args, {user}) => {
                return user ? user : null;
            }
        },
        myPosts: {
            type: PostConnection,
            args: connectionArgs,
            resolve: async (value, args, context) => {
                return connectionFromArray(
                    await postsLoaderByAuthors([context.user.id, ...context.user.friends]),
                args
            )
        }
    }})
});

export default QueryType;