import { GraphQLString, GraphQLInt } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import ReplyType from '../ReplyType';
import Reply from '../ReplyModel';

const CreateReply = mutationWithClientMutationId({
    name: 'CreateReply',
    description: 'Create Reply Mutation',
    inputFields: {
        author: {
            type: GraphQLString
        },
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
    mutateAndGetPayload: ({author, content, likes}) => {
        try {
            const reply = new Reply({author, content, likes});
            reply.save();
            return reply;
        } catch (err) {
            console.log(err);
        }
    }
});

export default CreateReply;