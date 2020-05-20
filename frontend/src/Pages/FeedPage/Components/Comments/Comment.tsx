import React, { Suspense, useState } from 'react';
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
        userHasLiked
        replies {
            ...RepliesTypeFragment
        }
        createdAt
        updatedAt
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

const commentLikeMutation = graphql `
    mutation CommentLikeMutation($commentId: String!) {
        LikeComment (input: {comment: $commentId, clientMutationId: "6"}) {
            comment {
                likes
                userHasLiked
            }
        }
    }
`;

const Comment = ({comment}: any) => {
    const commentEdge = useFragment(commentEdgeFragment, comment);
    const [likes, setLikes] = useState(commentEdge.node ? commentEdge.node.likes : 0);
    const [hasLiked, setHasLiked] = useState(commentEdge.node ? commentEdge.node.userHasLiked : false);

    const [commitReplyCre, replyCreIsInFlight] = useMutation(commentReplyCreationMutation);
    const [commitLikeMut, likeMutIsInFlight] = useMutation(commentLikeMutation);

    let replyContent = '';

    const replyCreationFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const variables = {
            content: replyContent,
            comment: commentEdge.node ? commentEdge.node.id : null
        }
        if (variables.comment && variables.content) {
            commitReplyCre({
                variables,
                onCompleted: (data: any) => {
                    console.log(data);
                }
            })
        }
    };

    const likeHandler = () => {
        setLikes(hasLiked ? likes - 1 : likes + 1);
        setHasLiked(hasLiked ? false : true);
        const variables = {
            commentId: commentEdge.node ? commentEdge.node.id : null
        }
        if (variables.commentId) {
            commitLikeMut({
                variables,
                onCompleted: ({LikeComment}: any) => {
                    setLikes(LikeComment.comment.likes);
                    setHasLiked(LikeComment.comment.userHasLiked);
                    console.log(LikeComment);
                }
            })
        }
    }

    return (
        <div>
            <div>
                <div>
                    {commentEdge.node ? commentEdge.node.content : null}
                </div>
                ({likes})<span onClick={likeHandler}>{hasLiked ? 'Unlike' : 'Like'}</span>
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