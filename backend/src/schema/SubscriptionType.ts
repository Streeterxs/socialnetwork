import { GraphQLObjectType } from "graphql";

import PostSubscriptions from "../modules/posts/subscriptions/";
import CommentSubscriptions from '../modules/comments/subscriptions'


const SubscriptionType = new GraphQLObjectType({
    name: 'SubscriptionType',
    fields: () => ({
        ...PostSubscriptions,
        ...CommentSubscriptions
    })
});

export default SubscriptionType