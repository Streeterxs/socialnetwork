import { GraphQLObjectType } from "graphql";
import UserMutations from "../modules/users/mutations/UserMutation";


const MutationType = new GraphQLObjectType({
    ...UserMutations
})

export default MutationType;