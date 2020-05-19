import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString } from "graphql";

import PostType from "../PostType";
import { IUser } from "../../../modules/users/UserModel";
import Post from "../PostModel";

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
            type: PostType
        }
    },
    mutateAndGetPayload: async ({post}: {post: string}, {user}: {user: IUser}) => {
        try {
            const postFounded = await Post.findById(post);
            if (postFounded.likes.includes(user.id)) {
                const indexOf = postFounded.likes.indexOf(user.id);
                postFounded.likes.splice(indexOf, 1);
                await postFounded.save();
                return postFounded;
            }
            postFounded.likes.push(user.id);
            await postFounded.save();
            return postFounded;
        } catch(err) {
            console.log(err);
        }
    }
});

export default LikePost;