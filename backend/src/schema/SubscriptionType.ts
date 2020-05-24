import { GraphQLObjectType } from "graphql";

import PostCreationSubscription from "../modules/posts/subscriptions/PostCreation";


const SubscriptionType = new GraphQLObjectType({
    name: 'SubscriptionType',
    fields: () => ({
        PostCreationSubscription,
    })
});

export default SubscriptionType