import React, { Suspense } from 'react';
import graphql from 'babel-plugin-relay/macro';

import { Reply, ReplyCreation } from './';
import { useFragment } from 'react-relay/hooks';

const repliesTypeFragment = graphql`
    fragment RepliesTypeFragment on ReplyListType {
        Replies {
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
    }
`;

const Replies = ({replies}: any) => {
    const repliesReturned = useFragment(repliesTypeFragment, replies);
    return (
        <div>
            <div>
                Replies Component...
            </div>
            <div>
                {
                    repliesReturned && repliesReturned.Replies && repliesReturned.Replies.edges && repliesReturned.Replies.edges.length > 0 ?
                    repliesReturned.Replies.edges.map((edge: any, index: number) => (
                        <Suspense key={index} fallback="loaging...">
                            <Reply reply={edge}/>
                        </Suspense>
                    )) :
                    null
                }

            </div>
        </div>

    );
};

export default Replies;