import React, { Suspense } from 'react';
import Post from './Post';

import { useFragment } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';


const Posts = ({posts}: any) => {
    const postListType: any = useFragment(graphql`
        fragment PostsTypeFragment on PostListType {
            posts {
                edges {
                    cursor,
                    node {
                        ...PostTypeFragment
                    }
                }
                pageInfo {
                    startCursor
                    endCursor
                    hasNextPage
                    hasPreviousPage
                }

            }
        }
    `,
    posts);
    return (
        <div>
            <div>
                Posts
            </div>
            <div>
                <Suspense fallback="Loading..">
                    {
                        postListType && postListType.posts && postListType.posts.edges && postListType.posts.edges.length > 0 ?
                        postListType.posts.edges.map((postEdge: any, index: number) => {
                            return (<Post key={index} post={postEdge.node}/>)
                        }) :
                        null
                    }
                </Suspense>
            </div>
        </div>
    );
};

export default Posts;