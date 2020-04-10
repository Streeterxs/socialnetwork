import { GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";

import userType from "../UserType";
import userModel from "../UserModel";

const TokenInput = new GraphQLInputObjectType({
    name: 'TokenInput',
    description: 'Input for token',
    fields: () => ({
        token: {
            type: GraphQLString
        }
    })
});

const UserInput = new GraphQLInputObjectType({
    name: 'UserInput',
    description: 'Inputs for users object',
    fields: () => ({
        name: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        tokens: {
            type: new GraphQLList(new GraphQLNonNull(TokenInput))
        }
    })
})

const UserMutations = {
    name: 'UserMutation',
    description: 'Mutations for User',
    fields: () => ({
        registerUser: {
            type: userType,
            args: {
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
            resolve: async (value: any, { name, password, email }: any) => {
                try {
                    const newUser = new userModel({name, password, email});
                    const returnNewUser = await newUser.save((err, doc) => {
                        console.log('error save: ', err);
                    });
                    return newUser;
                } catch (err) {
                    console.log(err)
                }
            }
        },
        login: {
            type: userType,
            args: {
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                }
            },
            resolve: async (value: any, { email, password }: any) => {
                try {
                    const user = await userModel.findByCredentials(email, password);
                    const token = await user.generateAuthToken();
                    return user;
                } catch (err) {
                    console.log(err);
                }
            }
        }
    })
};

export { UserInput };
export default UserMutations;