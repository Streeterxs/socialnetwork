import { GraphQLString } from "graphql";
import { withFilter } from "graphql-subscriptions";
import { subscriptionWithClientId } from "graphql-relay-subscription";

import { commentLoader } from "../CommentLoader";
import CommentType from "../CommentType";
import { pubsub } from "../../../app";
import { postLoaderByComment } from "../../posts/PostLoader";
import { loadUser } from "../../users/UserLoader";

const CommentLikeSubscription = subscriptionWithClientId({
    name: 'CommentLikeSubscription',
    description: 'Comment Like subscription',
    inputFields: {},
    outputFields: {
        comment: {
            type: CommentType,
            resolve: (commentObj: any) => commentLoader(commentObj.id)
        }
    },
    subscribe: withFilter((input: any, context: any) => {
        return pubsub.asyncIterator('commentLike');
    }, async (commentPayload: any, variables: any) => {
        const postFounded = await postLoaderByComment(commentPayload._id);
        const postFoundedAuthor = await loadUser(postFounded.author);

        const loggedUser = variables.user;

        return `${loggedUser._id}` === `${postFoundedAuthor._id}` || postFoundedAuthor.friends.includes(loggedUser._id);
    }),
    getPayload: (payloadCommentLike: any) => {
        return {
            id: payloadCommentLike.id,
        }
    }
});

export default CommentLikeSubscription;