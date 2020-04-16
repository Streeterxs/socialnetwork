import { GraphQLObjectType } from "graphql";
import UserMutations from "../modules/users/mutations";
import PostMutation from "../modules/posts/mutations";
import CommentMutations from '../modules/comments/mutations';
import ReplyMutations from '../modules/reply/mutations';

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutation Type',
    fields: () => ({
        ...UserMutations,
        ...PostMutation,
        ...CommentMutations,
        ...ReplyMutations
    })
});

export default MutationType;