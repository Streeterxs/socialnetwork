import { GraphQLObjectType, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import PostType from '../PostType';
import Post from '../PostModel';

const PostCreation = mutationWithClientMutationId({
    name: 'PostCreation',
    description: 'Post Creation',
    inputFields: {
        content: {
            type: GraphQLString
        },
        author: {
            type: GraphQLString
        }
    },
    outputFields: {
        post: {
            type: PostType,
            resolve: (post) => post
        }
    },
    mutateAndGetPayload: async ({content, author}) => {
        try {
            const postCreated = new Post({content, author});
            await postCreated.save();
            return postCreated;
        } catch (err) {
            console.log(err);
        }
    }
});

export default PostCreation;