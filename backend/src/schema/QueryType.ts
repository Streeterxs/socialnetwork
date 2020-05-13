import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';

import { postLoader } from '../modules/posts/PostLoader';
import userType, { PostConnection } from '../modules/users/UserType';
import { nodeField } from '../graphql/NodeDefinitions';
import { nodesField } from '../graphql/NodeDefinitions';


const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'General QueryType',
    fields: () => ({
        node: nodeField,
        nodes: nodesField,
        myPosts: {
            type: GraphQLNonNull(PostConnection),
            resolve: (value, args, {user}) => {
                return user.posts.map((postId: string) => postLoader(postId))
            }
        }
    })
});

export default QueryType;