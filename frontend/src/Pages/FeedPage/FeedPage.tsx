import React, { Suspense } from 'react';
import {Posts, PostCreation} from './Components'
import { useLazyLoadQuery } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';


/* friends {
    edges{
        cursor
        node {
            posts{
                ...myFriedsPostsFragment
            }
        }
    }
    pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
    }
} */


const FeedPage = () => {
    const userPostsQuery: any = useLazyLoadQuery(graphql`
        query FeedPageMyselfQuery {
            myPosts {
                ...PostsTypeFragment
            }
        }`, 
        {}, 
        {fetchPolicy: 'store-or-network'}
    );

    console.log(userPostsQuery);
    return (
        <div>
            <div>
                Feed Page
            </div>
            <div>
                <PostCreation/>
            </div>
            <div>
                <Suspense fallback="loading...">
                    {
                        userPostsQuery && userPostsQuery.myPosts && userPostsQuery.myPosts.posts ?
                        <Posts posts={userPostsQuery.myPosts.posts}/> :
                        null
                    }
                </Suspense>
            </div>
        </div>
    );
};

export default FeedPage;