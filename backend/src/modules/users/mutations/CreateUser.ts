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
            type: userType
        }
    },
    mutateAndGetPayload: async ({name, password, email}) => {
        try {
            const newUser = new userModel({name, password, email});
            const returnNewUser = await newUser.save((err, doc) => {
                console.log('error save: ', err);
            });
            return returnNewUser;
        } catch (err) {
            console.log(err)
        }
    }
});

export default mutation;