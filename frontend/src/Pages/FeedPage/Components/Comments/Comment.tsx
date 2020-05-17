import React, { Suspense } from 'react';
import { useFragment } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';

import { Replies } from '../';

const commentEdgeFragment = graphql`
fragment CommentTypeFragment on CommentTypeEdge {
    cursor
    node {
        author {
            name
        }
        content
        likes
        replies {
            ...RepliesTypeFragment
        }
    }
}
`

const Comment = ({comment}: any) => {
    const postEdge = useFragment(commentEdgeFragment, comment);
    return (
        <div>
            <div>
                {postEdge.node.content}
            </div>
            <div>
                <Suspense fallback="loading...">
                    {
                        postEdge && postEdge.node && postEdge.node.replies && postEdge.node.replies.length > 0?
                        <Replies replies={postEdge.node.replies}/> :
                        null
                    }
                </Suspense>
            </div>
        </div>
    );
};

export default Comment