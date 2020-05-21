import React, { Suspense } from 'react';
import graphql from 'babel-plugin-relay/macro';

import { Reply, ReplyCreation } from './';
import { useFragment, usePaginationFragment } from 'react-relay/hooks';

const repliesTypeFragment = graphql`
    fragment RepliesTypeFragment on CommentType @argumentDefinitions(
        first: {type: "Int", defaultValue: 0}
        last: {type: "Int"},
        before: {type: "String"},
        after: {type: "String", defaultValue: "cursor:1"}
    ) @refetchable(queryName: "RepliesListPagination"){
        replies(
            first: $first,
            last: $last,
            before: $before,
            after: $after
        ) @connection(key: "RepliesTypeFragment_replies") {
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
    const {
        data,
        hasNext,
        loadNext,
        hasPrevious,
        loadPrevious,
        isLoadingNext,
        isLoadingPrevious,
        refetch
    } = usePaginationFragment(repliesTypeFragment, replies);

    console.log('replies data:', data);
    console.log('replies hasNext: ', hasNext);

    return (
        <div className="my-5">
            {
                data.replies && data.replies.edges && data.replies.edges.length > 0 ?
                data.replies.edges.map((edge: any, index: number) => (
                    <Suspense key={index} fallback="loaging...">
                        <Reply reply={edge}/>
                    </Suspense>
                )) :
                null
            }
            <div>
                {
                    hasNext ?
                    data.replies && data.replies.edges && data.replies.edges.length <= 0 ?
                    <button disabled={!hasNext} onClick={() => {
                        loadNext(3, {
                            onComplete: (returnedData: any) => {
                                console.log('returnedData: ', returnedData)
                            }
                        })
                    }}>Load replies</button> :
                    <button disabled={!hasNext} onClick={() => {
                        loadNext(3, {
                            onComplete: (returnedData: any) => {
                                console.log('returnedData: ', returnedData)
                            }
                        })
                    }}>Load more replies</button> :
                    null
                }
            </div>

        </div>

    );
};

export default Replies;