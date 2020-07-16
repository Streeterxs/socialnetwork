import { subscriptionWithClientId } from "graphql-relay-subscription";
import { withFilter } from "graphql-subscriptions";

import { replyLoader } from "../ReplyLoader";
import ReplyType from "../ReplyType";
import { pubsub } from "../../../app";
import { IReply } from "../ReplyModel";
import { IComment } from "../../comments/CommentModel";
import { commentLoaderByReply } from "../../comments/CommentLoader";
import { IPost } from "../../posts/PostModel";
import { postLoaderByComment } from "../../posts/PostLoader";
import { loadUser } from "../../users/UserLoader";

const replyLikeSubscription = subscriptionWithClientId({
    name: 'ReplyLikeSubscription',
    description: 'Subscription to fetch likes in replies',
    inputFields: {},
    outputFields: {
        reply: {
            type: ReplyType,
            resolve: (replyObj: any) => replyLoader((replyObj.id))
        }
    },
    subscribe: withFilter(
        (input: any, context: any)=>{
            return pubsub.asyncIterator('replyLike');
        },
        async (reply: IReply, variables: any)=>{
            const commentFounded: IComment = await commentLoaderByReply(reply._id);
            const postFounded: IPost = await postLoaderByComment(commentFounded._id);
            const postAuthor = await loadUser(postFounded.author);

            return `${postAuthor._id}` === `${reply.author}` || postAuthor.friends.includes(reply.author);
        }
    ),
    getPayload: (replyObj: any) => ({
        id: replyObj.id
    })
});

export default replyLikeSubscription;