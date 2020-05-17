import React, { Suspense } from 'react';
import { Comments, CommentCreation } from '../';

import { useFragment } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';



const commentCreationMutation = graphql`
    mutation PostCommentCreationMutation($content: String!, $post: String!) {
        CreateComment(input: {content: $content, post: $post, clientMutationId: "1"}) {
            comment {
                content
                author {
                    name
                }
            }
        }
    }
`;

const postTypeFragment = graphql`
fragment PostTypeFragment on PostTypeEdge {
    cursor
    node {
        id
        author {
            name
        }
        content
        likes
        comments {
            ...CommentsTypeFragment
        }
    }
}
`

const Post = ({post}: any) => {
    const postEdge = useFragment(postTypeFragment,
    post);

    let commentContent = '';
    const commentCreation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const variables = {
            content: commentContent
        }
        console.log('variables for comment creation: ', variables);
    }
    console.log(postEdge);
    return (
        <div>
            <div>
                {postEdge.node.content}
            </div>
            <div>
                <Suspense fallback="loading">
                    {
                        postEdge && postEdge.node && postEdge.node.comments && postEdge.node.comments.length > 0?
                        <Comments comments={postEdge.node.comments}/> :
                        null
                    }
                </Suspense>
                <CommentCreation formSubmit={commentCreation} commentContentChange={newContent => {commentContent = newContent}}/>
            </div>
        </div>
    );
};

export default Post;