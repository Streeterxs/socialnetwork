import React, { Suspense, useEffect, useState } from 'react';

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
    const [isPaginating, setIsPaginating] = useState(false);

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

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadNext]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        console.log('isLoadingNext: ', isLoadingNext);
        if (hasNext && !isLoadingNext && !isPaginating) {
            setIsPaginating(true);
            handleLoadNext();
        };
    }

    const handleLoadNext = () => {
        loadNext(2, {onComplete: () => {
            console.log('completed load next');
            setIsPaginating(false);
        }});
    }

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
                <p>Loading...</p>  :
                <p>No more posts to load</p>
            }
        </div>
    );
};

export default Posts;