import { GraphQLString } from "graphql";

import userType from "../UserType";
import userModel from "../UserModel";
import { mutationWithClientMutationId } from "graphql-relay";

export const mutation = mutationWithClientMutationId({
    name: 'UserCreation',
    description: 'Create new user',
    inputFields: {
        name: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        }
    },
    outputFields: {
        user: {
            type: userType,
            resolve: (user) => user
        }
    },
    mutateAndGetPayload: async ({name, password, email}) => {
        try {
            const newUser = new userModel({name, password, email});
            const returnNewUser = await newUser.save();
            return returnNewUser;
        } catch (err) {
            console.log(err)
            return err;
        }
    }
});

export default mutation;