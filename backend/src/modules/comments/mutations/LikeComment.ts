import { mutationWithClientMutationId, fromGlobalId } from "graphql-relay";
import { GraphQLString } from "graphql";

import CommentType from "../CommentType";
import Comment from '../CommentModel';
import { IUser } from "../../../modules/users/UserModel";
import { pubsub } from "../../../app";
import { commentLoader } from "../CommentLoader";

const LikeComment = mutationWithClientMutationId({
    name: 'LikeComment',
    description: 'Update total likes for a comment type',
    inputFields: {
        comment: {
            type: GraphQLString
        }
    },
    outputFields: {
        comment: {
            type: CommentType,
            resolve: async (comment) => await commentLoader(comment)
        }
    },
    mutateAndGetPayload: async ({comment}, {user}: {user: IUser}) => {
        try {

            const {type, id} = fromGlobalId(comment);

            const commentId = id;
            const commentFound = await Comment.findOne({_id: commentId});

            if (commentFound.likes.includes(user.id)) {

                const indexOf = commentFound.likes.indexOf(user.id);
                commentFound.likes.splice(indexOf, 1);
                await commentFound.save();

                pubsub.publish('commentLike', commentFound);
                return commentFound
            };

            commentFound.likes.push(user.id);
            await commentFound.save();

            pubsub.publish('commentLike', commentFound);

            return commentFound;
        } catch (err) {
            console.log(err);
        }
    }
});

export default LikeComment;