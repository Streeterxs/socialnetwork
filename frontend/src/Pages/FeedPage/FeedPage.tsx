import React from 'react';
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
            myself {
                posts{
                    ...PostsTypeFragment
                }
                friends {
                    edges{
                        cursor
                        node {
                            posts{
                                ...PostsTypeFragment
                            }
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
                <Posts posts={userPostsQuery.myself.posts}/>
            </div>
        </div>
    );
};

export default FeedPage;