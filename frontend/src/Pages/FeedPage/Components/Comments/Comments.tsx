import React, { Suspense } from 'react';
import { useFragment } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';
import { Comment } from './'

const commentsTypeFragment = graphql`
    fragment CommentsTypeFragment on CommentTypeConnection {
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
`;

const Comments = ({comments}: {
    comments: any
}) => {
    const commentsTypeFragmentReturned = useFragment(commentsTypeFragment, comments);
    return (
        <div className="my-2">
            {
                commentsTypeFragmentReturned && commentsTypeFragmentReturned.edges && commentsTypeFragmentReturned.edges.length > 0 ?
                commentsTypeFragmentReturned.edges.map((edge: any, index: number) => {
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
        </div>
    );
};

export default Comments;