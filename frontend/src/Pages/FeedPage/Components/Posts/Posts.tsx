import React, { Suspense } from 'react';

import {  usePaginationFragment } from 'react-relay/lib/relay-experimental';
import graphql from 'babel-plugin-relay/macro';

import Post from './Post';



const postsTypeFragment = graphql`
fragment PostsTypeFragment on Query 
    @argumentDefinitions(
        first: {type: "Int", defaultValue: 2},
        last: {type: "Int"},
        before: {type: "String"},
        after: {type: "String"}
    ) 
    @refetchable(queryName: "PostListPagination") {
    myPosts (
        first: $first,
        last: $last,
        before: $before,
        after: $after,           
    ) @connection(key: "PostsTypeFragment_myPosts"){
        edges {
            cursor
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
}`

const Posts = ({posts}: any) => {

    const {
        data,
        loadNext,
        loadPrevious,
        hasNext,
        hasPrevious,
        isLoadingNext,
        isLoadingPrevious,
        refetch // For refetching connection
      }: any = usePaginationFragment(postsTypeFragment,
    posts);

    return (
        <div className="w-full">
            {
                data && data.myPosts && data.myPosts.edges && data.myPosts.edges.length > 0 ?
                data.myPosts.edges.filter((postEdge: any) => !!postEdge.node).map((postEdge: any, index: number) => {
                    return (
                        <Suspense key={index}  fallback="Loading..">
                            <div className="my-10">
                                <Post post={postEdge.node}/>
                            </div>
                        </Suspense> 
                    )
                }) :
                null
            }
            {
                hasNext ?
                <button disabled={!hasNext} onClick={() => {
                    loadNext(1, {
                        onCompleted: (returnedData: any) => {
                            console.log('returnedData: ', returnedData);
                            console.log('newValueData: ', data);
                        }
                    })
                }}>Load next page</button> :
                <p>No more posts to load</p>
            }
        </div>
    );
};

export default Posts;