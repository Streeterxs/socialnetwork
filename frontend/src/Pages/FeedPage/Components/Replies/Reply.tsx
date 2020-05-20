import React, { useState } from 'react';

import { useMutation } from 'react-relay/lib/relay-experimental';
import graphql from 'babel-plugin-relay/macro';
import { useFragment } from 'react-relay/hooks';

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
        <div>
            <div>
                {replyFragmentReturn.node.content}
            </div>
            ({likes})<span onClick={handleLike}>{hasLiked ? 'Unlike' : 'Like'}</span>
        </div>
    );
};

export default Reply;