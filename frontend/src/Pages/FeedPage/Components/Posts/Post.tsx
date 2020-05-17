import React, { Suspense } from 'react';
import { Comments } from '../';

import { useFragment } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';


const Post = ({post}: any) => {
    const postEdge = useFragment(graphql`
        fragment PostTypeFragment on PostType {
            content
            likes
        }
    `,
    post);
    console.log(postEdge);
    return (
        <div>
            <div>
                {postEdge.content}
            </div>
            <div>
                <Suspense fallback="loading">
                    <Comments/>
                </Suspense>
            </div>
        </div>
    );
};

export default Post;