import { GraphQLString, GraphQLInt } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import ReplyType from '../ReplyType';
import Reply from '../ReplyModel';

const CreateReply = mutationWithClientMutationId({
    name: 'CreateReply',
    description: 'Create Reply Mutation',
    inputFields: {
        content: {
            type: GraphQLString
        },
        likes: {
            type: GraphQLInt
        }
    },
    outputFields: {
        reply: {
            type: ReplyType,
            resolve: (reply) => reply
        }
    },
    mutateAndGetPayload: ({content, likes}, {loggedUser}) => {
        try {
            const reply = new Reply({author: loggedUser, content, likes});
            reply.save((err, doc) => {
                console.log(err);
            });
            return reply;
        } catch (err) {
            console.log(err);
        }
    }
});

export default CreateReply;