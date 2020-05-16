import React, { Suspense } from 'react';
import { Comments } from '../';

import { useFragment } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';


const Post = ({post}: any) => {
    const postEdge = useFragment(graphql`
        fragment PostTypeFragment on PostTypeEdge {
            cursor,
            node {
                content
                likes
            }
        }
    `,
    post);
    console.log(postEdge);
    return (
        <div>
            <div>
                Single Post...
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