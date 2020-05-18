import React, { Suspense } from 'react';
import { useFragment } from 'react-relay/hooks';
import { useMutation } from 'react-relay/lib/relay-experimental';
import graphql from 'babel-plugin-relay/macro';

import { Replies, ReplyCreation } from '../';

const commentEdgeFragment = graphql`
fragment CommentTypeFragment on CommentTypeEdge {
    cursor
    node {
        id
        author {
            name
        }
        content
        likes
        replies {
            ...RepliesTypeFragment
        }
    }
    
}`;

const commentReplyCreationMutation = graphql`
    mutation CommentReplyCreationMutation ($content: String!, $comment: String!) {
        CreateReply (input: {content: $content, comment: $comment, clientMutationId: "3"}) {
            reply {
                content,
                author {
                    name
                }
            }
        }
    }
`;

const Comment = ({comment}: any) => {
    const [commit, isInFlight] = useMutation(commentReplyCreationMutation);
    const commentEdge = useFragment(commentEdgeFragment, comment);

    let replyContent = '';

    const replyCreationFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const variables = {
            content: replyContent,
            comment: commentEdge.node ? commentEdge.node.id : null
        }
        if (variables.comment && variables.content) {
            commit({
                variables,
                onCompleted: (data: any) => {
                    console.log(data);
                }
            })
        }
    };

    return (
        <div>
            <div>
                {commentEdge.node ? commentEdge.node.content : null}
            </div>
            <div>
                <Suspense fallback="loading...">
                    {
                        commentEdge && commentEdge.node && commentEdge.node.replies ?
                        <Replies replies={commentEdge.node.replies}/> :
                        null
                    }
                </Suspense>
                    {
                        commentEdge && commentEdge.node ?
                        <ReplyCreation formSubmit={replyCreationFormSubmit} replyContentChange={newContent => replyContent = newContent}/> :
                        null
                    }
            </div>
        </div>
    );
};

export default Comment