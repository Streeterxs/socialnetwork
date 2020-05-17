import React, { Suspense } from 'react';
import { useFragment } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';

import { Replies, ReplyCreation } from '../';

const commentEdgeFragment = graphql`
fragment CommentTypeFragment on CommentTypeEdge {
    cursor
    node {
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
        CreateReply (input: {content: $content, comment: $comment, clientMutationId: "1"}) {
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
    const postEdge = useFragment(commentEdgeFragment, comment);

    let replyContent = '';

    const replyCreationFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const variables = {
            content: replyContent
        }
        console.log(variables);
    }
    return (
        <div>
            <div>
                {postEdge.node.content}
            </div>
            <div>
                <Suspense fallback="loading...">
                    {
                        postEdge && postEdge.node && postEdge.node.replies && postEdge.node.replies.length > 0?
                        <Replies replies={postEdge.node.replies}/> :
                        null
                    }
                </Suspense>
                <ReplyCreation formSubmit={replyCreationFormSubmit} replyContentChange={newContent => replyContent = newContent}/>
            </div>
        </div>
    );
};

export default Comment