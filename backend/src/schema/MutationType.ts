import { GraphQLObjectType } from "graphql";
import UserMutations from "../modules/users/mutations";
import PostMutation from "../modules/posts/mutations/PostMutation";
import CommentMutations from '../modules/comments/mutations';


const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutation Type',
    fields: () => ({
        ...UserMutations,
        PostMutation,
        ...CommentMutations
    })
});

export default MutationType;