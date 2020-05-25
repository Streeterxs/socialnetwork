import { GraphQLObjectType } from "graphql";

import PostSubscriptions from "../modules/posts/subscriptions/";
import CommentSubscriptions from '../modules/comments/subscriptions'
import ReplySubscriptions from "../modules/reply/subscriptions";


const SubscriptionType = new GraphQLObjectType({
    name: 'SubscriptionType',
    fields: () => ({
        ...PostSubscriptions,
        ...CommentSubscriptions,
        ...ReplySubscriptions
    })
});

export default SubscriptionType