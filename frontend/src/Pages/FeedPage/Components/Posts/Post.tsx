import React, { Suspense } from 'react';
import { Comments, CommentCreation } from '../';

import { useFragment } from 'react-relay/hooks';
import { useMutation } from 'react-relay/lib/relay-experimental';
import graphql from 'babel-plugin-relay/macro';



const commentCreationMutation = graphql`
    mutation PostCommentCreationMutation($content: String!, $post: String!) {
        CreateComment(input: {content: $content, post: $post, clientMutationId: "2"}) {
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
    const [commit, isInFlight] = useMutation(commentCreationMutation);
    const postEdge = useFragment(postTypeFragment, post);

    let commentContent = '';
    const commentCreation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const variables = {
            content: commentContent,
            post: postEdge.node.id
        }
        commit({
            variables,
            onCompleted: (data: any) => {
                console.log(data)
            }
        });
    }
    return (
        <div>
            <div>
                {postEdge.node.content}
            </div>
            <div>
                <Suspense fallback="loading">
                    {
                        postEdge && postEdge.node.comments ?
                        <Comments comments={postEdge.node.comments}/> :
                        null 
                    }
                </Suspense>
                <CommentCreation formSubmit={commentCreation} commentContentChange={newContent => {
                    commentContent = newContent
                    }}/>
            </div>
        </div>
    );
};

export default Post;