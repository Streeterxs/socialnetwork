import { subscriptionWithClientId } from "graphql-relay-subscription";
import ReplyType from "../ReplyType";
import { replyLoader } from "../ReplyLoader";
import CommentType from "../../comments/CommentType";
import { commentLoaderByReply } from "../../comments/CommentLoader";
import { withFilter } from "graphql-subscriptions";
import { IReply } from "../ReplyModel";
import { pubsub } from "../../../app";
import { IComment } from "../../comments/CommentModel";
import { IPost } from "../../posts/PostModel";
import { postLoaderByComment } from "../../posts/PostLoader";
import { loadUser } from "../../users/UserLoader";

const ReplyCreationSubscription = subscriptionWithClientId({
    name: 'ReplyCreationSubscription',
    description: 'Reply Creation Subscription',
    inputFields: {},
    outputFields: {
        reply: {
            type: ReplyType,
            resolve: (replyObj: any) => replyLoader(replyObj.id)
        },
        comment: {
            type: CommentType,
            resolve: (replyObj: any) => commentLoaderByReply(replyObj.id)
        }
    },
    subscribe: withFilter((input: any, context: any) => {
        return pubsub.asyncIterator('newReply')
    }, async (reply: IReply, variables: any) => {
        const commentFounded: IComment = await commentLoaderByReply(reply._id);
        const postFounded: IPost = await postLoaderByComment(commentFounded._id);
        const postAuthor = await loadUser(postFounded.author);

        return `${postAuthor._id}` === `${reply.author}` || postAuthor.friends.includes(reply.author);
    }),
    getPayload: (replyObj: any) => ({
        id: replyObj.id
    })
});

export default ReplyCreationSubscription;