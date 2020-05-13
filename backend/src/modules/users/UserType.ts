import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import { IUser } from './UserModel';
import { userLoader, loadUser } from './UserLoader';
import { connectionDefinitions, connectionArgs, connectionFromArray } from 'graphql-relay';


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
                    return user.name
                }
            },
            password: {
                type: GraphQLString,
                resolve: (user, _) => user.password
            },
            email: {
                type: GraphQLString,
                resolve: (user, _) => user.email
            },
            token: {
                type: GraphQLString,
                resolve: (user, _) => user.tokens[0].token
            },
            friends: {
                type: UserConnection,
                args: connectionArgs,
                resolve: (user, args) => {
                        console.log(user)
                        return connectionFromArray(
                        user.friends.map(id => loadUser(id)),
                        args
                    )
                }
            },
            _id: {
                type: GraphQLString,
                resolve: (user, _) => userLoader(user, '_id')
            }
        }
    )
});

const {connectionType: UserConnection} =
  connectionDefinitions({nodeType: userType});

export default userType;