import { GraphQLObjectType, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import Comment from '../CommentModel';
import userType from '../../../modules/users/UserType';
import PostType from '../../../modules/posts/PostType';
import CommentType from '../CommentType';

const CreateComment = mutationWithClientMutationId({
    name: 'CreateComment',
    description: 'Create Comment Mutation',
    inputFields: {
        author: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        },
        post: {
            type: GraphQLString
        }
    },
    outputFields: {
        post: {
            type: CommentType,
            resolve: (comment) => comment
        }
    },
    mutateAndGetPayload: async ({author, content, post}) => {
        try {
            const comment = new Comment({author, content, post});
            await comment.save();
            return comment;
        } catch (err) {
            console.log(err);
        }
    }
});

export default CreateComment;