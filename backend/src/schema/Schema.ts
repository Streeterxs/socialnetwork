import { GraphQLSchema } from "graphql";

import QueryType from "./QueryType";
import MutationType from "./MutationType";


export const Schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});