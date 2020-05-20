import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import { IUser } from './UserModel';
import { userLoader, loadUser } from './UserLoader';
import { connectionDefinitions, connectionArgs, connectionFromArray } from 'graphql-relay';
import PostType, { PostConnection } from '../posts/PostType';


const userType = new GraphQLObjectType<IUser>({
    name: 'UserType',
    description: 'User type',
    fields: () => (
        {
            name: {
                type: GraphQLString,
                resolve: (user, _) => {
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
            createdAt: {
                type: GraphQLString,
                resolve: (user) => user.createdAt
            },
            updatedAt: {
                type: GraphQLString,
                resolve: (user) => user.updatedAt
            },
            token: {
                type: GraphQLString,
                resolve: (user, _) => user.tokens[0].token
            },
            friends: {
                type: UserConnection,
                args: connectionArgs,
                resolve: (user, args) => {
                        return connectionFromArray(
                        user.friends.map(id => loadUser(id)),
                        args
                    )
                }
            },
            posts: {
                type: PostConnection,
                args: connectionArgs,
                resolve: (user, args) => {
                        return connectionFromArray(
                            user.posts.map(id => loadUser(id)),
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