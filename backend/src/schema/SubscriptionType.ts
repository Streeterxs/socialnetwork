import { GraphQLObjectType } from "graphql";

import PostSubscriptions from "../modules/posts/subscriptions/";


const SubscriptionType = new GraphQLObjectType({
    name: 'SubscriptionType',
    fields: () => ({
        ...PostSubscriptions,
    })
});

export default SubscriptionType