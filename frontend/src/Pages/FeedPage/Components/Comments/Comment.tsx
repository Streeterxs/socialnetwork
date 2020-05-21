import React, { Suspense, useState } from 'react';
import { useFragment } from 'react-relay/hooks';
import { useMutation } from 'react-relay/lib/relay-experimental';
import graphql from 'babel-plugin-relay/macro';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'

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
        createdAt
        updatedAt
        ...RepliesTypeFragment
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

    const [showReplies, setShowReplies] = useState(false);

    const [commitReplyCre, replyCreIsInFlight] = useMutation(commentReplyCreationMutation);
    const [commitLikeMut, likeMutIsInFlight] = useMutation(commentLikeMutation);

    let replyContent = '';

    const replyCreationFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        repliesHandler();
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

    const repliesHandler = () => {
        setShowReplies(showReplies ? false : true);
    }

    console.log('commentEdge: ', commentEdge);

    return (
        <div className="w-full">
            <div className="my-2">
                <div>
                    <p className="text-gray-800 text-base">
                        {commentEdge.node ? commentEdge.node.content : null}
                    </p>
                </div>
                <div className="mb-2">
                    <span className="text-teal-600 mr-2">
                        <FontAwesomeIcon icon={faThumbsUp} /> {likes}
                    </span>
                    <span className={"cursor-pointer text-gray-800 " + (hasLiked ? 'text-teal-600' : '')} onClick={likeHandler}>
                        {
                            hasLiked ?
                            <>Liked</> :
                            <>Like</>
                        }
                    </span>
                    <span className={"cursor-pointer text-gray-800 mx-2 " + (showReplies ? 'text-teal-700' : '')} onClick={repliesHandler}>
                        {
                            showReplies ?
                            <>Replying</> :
                            <>Reply</>
                        }
                    </span>
                </div>
            </div>
            <div className="px-6">
                <div className="mb-4">
                    <Suspense fallback="loading...">
                        {
                            showReplies && commentEdge && commentEdge.node ?
                            <Replies replies={commentEdge.node}/> :
                            null
                        }
                    </Suspense>
                </div>
                {
                    showReplies && commentEdge && commentEdge.node ?
                    <ReplyCreation formSubmit={replyCreationFormSubmit} replyContentChange={newContent => replyContent = newContent}/> :
                    null
                }
            </div>
        </div>
    );
};

export default Comment