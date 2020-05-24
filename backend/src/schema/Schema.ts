import { GraphQLSchema } from "graphql";

import QueryType from "./QueryType";
import MutationType from "./MutationType";
import SubscriptionType from "./SubscriptionType";


export const Schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
    subscription: SubscriptionType
});