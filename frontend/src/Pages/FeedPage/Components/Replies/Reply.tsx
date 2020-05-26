import React, { useState } from 'react';

import { useMutation } from 'react-relay/lib/relay-experimental';
import graphql from 'babel-plugin-relay/macro';
import { useFragment } from 'react-relay/hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'

const replyTypeFragment = graphql`
    fragment ReplyTypeFragment on ReplyTypeEdge {
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
        }
    }
`;

const replyLikeMutation = graphql`
    mutation ReplyLikeMutation($reply: String!) {
        LikeReply(input: {reply: $reply, clientMutationId: "7"}) {
            reply {
                likes
                userHasLiked
            }
        }
    }
`;

const Reply = ({reply}: any) => {
    const replyFragmentReturn = useFragment(replyTypeFragment, reply);
    const [likes, setLikes] = useState(replyFragmentReturn.node.likes);
    const [hasLiked, setHasLiked] = useState(replyFragmentReturn.node.userHasLiked);

    const [commitLikeMut, likeMutIsInFlight] = useMutation(replyLikeMutation);

    const handleLike = () => {
        setLikes(hasLiked ? likes - 1 : likes + 1);
        setHasLiked(hasLiked ? false : true);

        const variables = {
            reply: replyFragmentReturn.node.id
        }

        commitLikeMut({
            variables,
            onCompleted: ({LikeReply}: any) => {
                setLikes(LikeReply.reply.likes);
                setHasLiked(LikeReply.reply.userHasLiked);
                console.log(LikeReply);
            }
        })
    }

    return (
        <div className="w-full my-1">
            <div>
                <small>
                    <b>
                        {replyFragmentReturn.node.author.name}
                    </b>
                </small>
                <p className="text-gray-800 text-base">
                    {replyFragmentReturn.node.content}
                </p>
            </div>
            <div className="mb-2">
                <span className="text-teal-600 mr-2">
                    <FontAwesomeIcon icon={faThumbsUp} /> {likeMutIsInFlight ? likes : replyFragmentReturn.node.likes}
                </span>
                <span className={"cursor-pointer text-gray-800 " + ((likeMutIsInFlight ? hasLiked: replyFragmentReturn.node.userHasLiked) ? 'text-teal-600' : '')} onClick={handleLike}>
                    {
                        (likeMutIsInFlight ? hasLiked : replyFragmentReturn.node.userHasLiked) ?
                        <>Liked</> :
                        <>Like</>
                    }
                </span>
            </div>
        </div>
    );
};

export default Reply;