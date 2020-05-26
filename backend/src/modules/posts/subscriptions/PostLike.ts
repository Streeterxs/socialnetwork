import { subscriptionWithClientId } from "graphql-relay-subscription";
import { withFilter } from "graphql-subscriptions";

import PostType from "../PostType";
import { pubsub } from "../../../app";
import { IPost } from "../PostModel";
import { postLoader } from "../PostLoader";
import { loadUser } from "../../users/UserLoader";

const PostLikeSubscription = subscriptionWithClientId({
    name: 'PostLikeSubscription',
    description: 'Post Like subscription',
    inputFields: {},
    outputFields: {
        post: {
            type: PostType,
            resolve: (post: IPost) => postLoader(post.id)
        }
    },
    subscribe: withFilter((input: any, context: any) => {
        return pubsub.asyncIterator('postLike');
    }, async (postLiked: IPost, variables: any) => {
        const loggedUser = variables.user;
        const author = await loadUser(postLiked.author);

        return `${loggedUser._id}` === `${author._id}` || !!author.friends.includes(loggedUser._id);
    }),
    getPayload: (obj: any) => {
        return {
            id: obj.id
        }
    }
});

export default PostLikeSubscription