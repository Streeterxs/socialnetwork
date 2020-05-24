import { mutationWithClientMutationId, fromGlobalId } from "graphql-relay";
import { GraphQLString } from "graphql";

import PostType from "../PostType";
import { IUser } from "../../../modules/users/UserModel";
import { postLoader } from "../PostLoader";
import { pubsub } from "../../../app";

const LikePost = mutationWithClientMutationId({
    name: 'LikePost',
    description: 'Mutation for like handling for posts',
    inputFields: {
        post: {
            type: GraphQLString
        }
    },
    outputFields: {
        post: {
            type: PostType,
            resolve: (post) => post
        }
    },
    mutateAndGetPayload: async ({post}: {post: string}, {user}: {user: IUser}) => {
        try {
            const {type, id} = fromGlobalId(post);
            const postId = id;
            const postFounded = await postLoader(postId);
            if (postFounded.likes.includes(user.id)) {
                const indexOf = postFounded.likes.indexOf(user.id);
                postFounded.likes.splice(indexOf, 1);
                await postFounded.save();
                pubsub.publish('postLike', postFounded);
                return postFounded;
            }
            postFounded.likes.push(user._id);
            await postFounded.save();
            pubsub.publish('postLike', postFounded);
            return postFounded;
        } catch(err) {
            console.log(err);
        }
    }
});

export default LikePost;