import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import Comment from '../CommentModel';
import CommentType from '../CommentType';
import { postLoader } from '../../../modules/posts/PostLoader';
import { IUser } from '../../../modules/users/UserModel';

const CreateComment = mutationWithClientMutationId({
    name: 'CreateComment',
    description: 'Create Comment Mutation',
    inputFields: {
        content: {
            type: GraphQLString
        },
        post: {
            type: GraphQLString
        }
    },
    outputFields: {
        comment: {
            type: CommentType,
            resolve: (comment) => comment
        }
    },
    mutateAndGetPayload: async ({content, post} : {
        content: string,
        post: string
    }, {user}: {user: IUser}) => {
        try {
            const {type, id} = fromGlobalId(post);
            const postId = id;
            const comment = new Comment({author: user.id, content});
            await comment.save();
            const postFinded = await postLoader(postId);
            postFinded.comments.push(comment.id);
            postFinded.save();
            return comment;
        } catch (err) {
            console.log(err);
        }
    }
});

export default CreateComment;