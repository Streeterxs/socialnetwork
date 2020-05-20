import React, { Suspense } from 'react';
import graphql from 'babel-plugin-relay/macro';

import { Reply, ReplyCreation } from './';
import { useFragment } from 'react-relay/hooks';

const repliesTypeFragment = graphql`
    fragment RepliesTypeFragment on ReplyTypeConnection {
        edges {
            ...ReplyTypeFragment
        }
        pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
        }
    }
`;

const Replies = ({replies}: any) => {
    const repliesReturned = useFragment(repliesTypeFragment, replies);
    return (
        <div className="my-5">
            {
                repliesReturned && repliesReturned.edges && repliesReturned.edges.length > 0 ?
                repliesReturned.edges.map((edge: any, index: number) => (
                    <Suspense key={index} fallback="loaging...">
                        <Reply reply={edge}/>
                    </Suspense>
                )) :
                null
            }

        </div>

    );
};

export default Replies;