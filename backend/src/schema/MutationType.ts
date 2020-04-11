import { GraphQLObjectType } from "graphql";
import UserMutations from "../modules/users/mutations";
import PostMutation from "../modules/posts/mutations/PostMutation";


const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutation Type',
    fields: () => ({
        ...UserMutations,
        PostMutation
    })
});

export default MutationType;