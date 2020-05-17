import { GraphQLString, GraphQLInt } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import ReplyType from '../ReplyType';
import Reply from '../ReplyModel';
import { commentLoader } from '../../../modules/comments/CommentLoader';

const CreateReply = mutationWithClientMutationId({
    name: 'CreateReply',
    description: 'Create Reply Mutation',
    inputFields: {
        content: {
            type: GraphQLString
        },
        comment: {
            type: GraphQLString
        }
    },
    outputFields: {
        reply: {
            type: ReplyType,
            resolve: (reply) => reply
        }
    },
    mutateAndGetPayload: async ({content, comment}, {user}) => {
        try {
            const reply = new Reply({author: user.id, content});
            await reply.save((err, doc) => {
                console.log(err);
            });
            const commentReturned = await commentLoader(comment);
            commentReturned.replies.push(reply.id);
            commentReturned.save();
            return reply;
        } catch (err) {
            console.log(err);
        }
    }
});

export default CreateReply;