import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import { IUser } from './UserModel';
import { userLoader } from './UserLoader';

const userType = new GraphQLObjectType<IUser>({
    name: 'User',
    description: 'User',
    fields: () => (
        {
            name: {
                type: GraphQLString,
                resolve: (user, _) => {
                    console.log('user: ', user);
                    console.log('underline: ', _);
                    return userLoader(user, 'name');
                }
            },
            password: {
                type: GraphQLString,
                resolve: (user, _) => userLoader(user, 'password')
            },
            email: {
                type: GraphQLString,
                resolve: (user, _) => userLoader(user, 'email')
            },
            token: {
                type: GraphQLString,
                resolve: (user, _) => userLoader(user, 'tokens')
            },
            _id: {
                type: GraphQLString,
                resolve: (user, _) => userLoader(user, '_id')
            }
        }
    )
})

export default userType;