import { subscriptionWithClientId } from "graphql-relay-subscription";
import { withFilter } from "graphql-subscriptions";

import CommentType from "../CommentType";
import { commentLoader } from "../CommentLoader";
import { pubsub } from "../../../app";
import { IComment } from "../CommentModel";
import { postLoaderByComment } from "../../posts/PostLoader";
import { loadUser } from "../../users/UserLoader";
import { GraphQLString } from "graphql";
import PostType from "../../posts/PostType";

const CreateCommentSubscription = subscriptionWithClientId({
    name: "CreateCommentSubscription",
    description: "Create Comment Subscription",
    inputFields: {},
    outputFields: {
        comment: {
            type: CommentType,
            resolve: async (comment: any) => await commentLoader(comment.id)
        },
        post: {
            type: PostType,
            resolve: async (comment: any) =>{
                const postFounded = await postLoaderByComment(comment.id);
                return postFounded
            }
        }
    },
    subscribe: withFilter((input: any, context: any) => {
        return pubsub.asyncIterator('newComment');
    }, async (comment: IComment, variables: any) => {
        const postFounded = await postLoaderByComment(comment._id);
        const postFoundedAuthor = await loadUser(postFounded.author);

        const loggedUser = variables.user;

        return `${loggedUser._id}` === `${postFoundedAuthor._id}` || postFoundedAuthor.friends.includes(loggedUser._id);
    }),
    getPayload: (obj: any) => {
        return {
            id: obj.id
        }
    }
});

export default CreateCommentSubscription;