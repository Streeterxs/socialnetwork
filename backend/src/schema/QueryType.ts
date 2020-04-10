import { GraphQLObjectType, GraphQLString } from 'graphql';

import { loadLoggedUser } from '../modules/users/UserLoader';
import userType from '../modules/users/UserType';


const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'General QueryType',
    fields: () => ({
        loggedUser: {
            type: userType,
            args: {
                token: {
                    type: GraphQLString
                }
            },
            resolve: (value, {token}) => loadLoggedUser(token)
        }
    })
});

export default QueryType;