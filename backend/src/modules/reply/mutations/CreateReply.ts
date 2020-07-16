import { GraphQLString, GraphQLInt } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import ReplyType from '../ReplyType';
import Reply from '../ReplyModel';
import { commentLoader } from '../../../modules/comments/CommentLoader';
import { pubsub } from '../../../app';
import { replyLoader } from '../ReplyLoader';

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
            resolve: async (reply) => await replyLoader(reply.id)
        }
    },
    mutateAndGetPayload: async ({content, comment}, {user}) => {
        try {

            const {type, id} = fromGlobalId(comment);

            const reply = new Reply({author: user.id, content});
            await reply.save();

            const commentReturned = await commentLoader(id);
            commentReturned.replies = [reply.id].concat(commentReturned.replies);
            await commentReturned.save();

            pubsub.publish('newReply', reply);

            return reply;
        } catch (err) {
            console.log(err);
        }
    }
});

export default CreateReply;