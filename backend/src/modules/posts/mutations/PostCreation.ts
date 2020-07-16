import { GraphQLObjectType, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import PostType from '../PostType';
import Post from '../PostModel';
import { IUser } from '../../../modules/users/UserModel';
import { pubsub } from '../../../app';
import { postLoader } from '../PostLoader';

const PostCreation = mutationWithClientMutationId({
    name: 'PostCreation',
    description: 'Post Creation',
    inputFields: {
        content: {
            type: GraphQLString
        }
    },
    outputFields: {
        post: {
            type: PostType,
            resolve: async (post) => await postLoader(post.id)
        }
    },
    mutateAndGetPayload: async ({content}, {user}: {user: IUser}) => {
        try {

            const postCreated = new Post({content, author: `${user.id}`});
            await postCreated.save();

            user.posts.push(`${postCreated.id}`);
            await user.save();

            pubsub.publish('newPost', postCreated);

            return postCreated;
        } catch (err) {
            console.log(err);
        }
    }
});

export default PostCreation;