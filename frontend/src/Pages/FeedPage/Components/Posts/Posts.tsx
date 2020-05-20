import React, { Suspense } from 'react';
import Post from './Post';

import { useFragment } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';


const Posts = ({posts}: any) => {
    const postListType: any = useFragment(graphql`
        fragment PostsTypeFragment on PostListType {
            posts {
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
        }
    `,
    posts);

    return (
        <div className="w-full">
            {
                postListType && postListType.posts && postListType.posts.edges && postListType.posts.edges.length > 0 ?
                postListType.posts.edges.map((postEdge: any, index: number) => {
                    return (
                        <Suspense key={index}  fallback="Loading..">
                            <div className="my-10">
                                <Post post={postEdge}/>
                            </div>
                        </Suspense>
                    )
                }) :
                null
            }
        </div>
    );
};

export default Posts;