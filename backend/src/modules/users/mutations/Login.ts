import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString } from "graphql";
import userType from "../UserType";
import User from "../UserModel";


const mutation = mutationWithClientMutationId({
    name: 'Login',
    description: 'Login a user, generates new token',
    inputFields: {
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        }
    },
    outputFields: {
        user: {
            type: userType,
            resolve: (user) => user
        }
    },
    mutateAndGetPayload: async ({email, password}) => {
        try {
            console.log(email, password);
            const user = await User.findByCredentials(email, password);
            const token = await user.generateAuthToken();
            console.log(user);
            return user;
        } catch (err) {
            console.log('entrou erro catch');
            console.log(err);
        }
    }
});

export default mutation;