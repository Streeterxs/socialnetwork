import React from 'react';

import graphql from 'babel-plugin-relay/macro';
import { useFragment } from 'react-relay/hooks';

const replyTypeFragment = graphql`
    fragment ReplyTypeFragment on ReplyTypeEdge {
        cursor
        node{
            author {
                name
            }
            content
            likes
        }
    }
`;

const Reply = ({reply}: any) => {
    const replyFragmentReturn = useFragment(replyTypeFragment, reply);
    return (
        <div>
            {replyFragmentReturn.node.content}
        </div>
    );
};

export default Reply;