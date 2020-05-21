import React, { Suspense } from 'react';
import { useFragment, usePaginationFragment } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';
import { Comment } from './'

const commentsTypeFragment = graphql`
    fragment CommentsTypeFragment on PostType @argumentDefinitions(
        first: {type: "Int", defaultValue: 4},
        last: {type: "Int"},
        before: {type: "String"},
        after: {type: "String", defaultValue: "cursor:1"}
    ) @refetchable(queryName: "CommentsListPagination") {
        comments (
                first: $first
                last: $last
                before: $before
                after: $after
            ) @connection(key: "CommentsTypeFragment_comments") {
            edges {
                ...CommentTypeFragment
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

const Comments = ({comments}: {
    comments: any
}) => {
    const {
        data,
        loadNext,
        loadPrevious,
        hasNext,
        hasPrevious,
        isLoadingNext,
        isLoadingPrevious,
        refetch // For refetching connection
      } = usePaginationFragment(commentsTypeFragment, comments);

    return (
        <div className="my-2">
            { 
                data && data.comments && data.comments.edges.length > 0 ?
                data.comments.edges.map((edge: any, index: number) => {
                    return (
                        <Suspense key={index} fallback="loading...">
                            <div className="my-5 w-full">
                                <Comment comment={edge}/>
                            </div>
                        </Suspense>
                    )
                }):
                null
             }
             {
                 hasNext && data && data.comments && data.comments.edges.length > 0 ?
                 <button disabled={!hasNext} onClick={() => {
                     loadNext(1)
                 }}>Load next page</button> :
                 null
             }
        </div>
    );
};

export default Comments;