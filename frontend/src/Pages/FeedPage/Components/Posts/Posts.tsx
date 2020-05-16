import React, { Suspense } from 'react';
import Post from './Post';

import { useFragment } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';


const Posts = ({posts}: any) => {
    const postsEdges: any = useFragment(graphql`
        fragment PostsTypeFragment on PostTypeConnection {
        edges {
            ...PostTypeFragment
        }
        pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
        }
    `,
    posts);
    console.log(postsEdges);
    return (
        <div>
            <div>
                Posts
            </div>
            <div>
                <Suspense fallback="Loading..">
                    {
                        postsEdges.edges.map((postEdge: any) => (
                            <Post post={postEdge}/>
                        ))
                    }
                </Suspense>
            </div>
        </div>
    );
};

export default Posts;