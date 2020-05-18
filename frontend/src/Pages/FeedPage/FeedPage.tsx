import React, { Suspense } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';

import {Posts, PostCreation} from './Components'
import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'react-relay/lib/relay-experimental';


const loginMutation = graphql`
  mutation FeedPagePostCreationMutation($content: String!) {
    PostCreation(input: {content: $content, clientMutationId: "1"}) {
      post {
        author {
            name
        }
        content
        likes
      }
    }
  }
`;


const FeedPage = () => {
    const [commit, isInFlight] = useMutation(loginMutation);
    const userPostsQuery: any = useLazyLoadQuery(graphql`
        query FeedPageMyselfQuery {
            myPosts {
                ...PostsTypeFragment
            }
        }`, 
        {}, 
        {fetchPolicy: 'store-or-network'}
    );
    let content = "";
    const handlePostFormCreationSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const variables = {
            content
        }
        commit({
            variables,
            onCompleted: (data: any) => {
                console.log(data);
            }
        });
    }

    return (
        <div>
            <div>
                Feed Page
            </div>
            <div>
                {
                    isInFlight ? 'Loading' : null
                }
                <PostCreation contentChange={(postContent: string) => {content = postContent}} formSubmit={handlePostFormCreationSubmit}/>
            </div>
            <div>
                <Suspense fallback="loading...">
                    {
                        userPostsQuery && userPostsQuery.myPosts ?
                        <Posts posts={userPostsQuery.myPosts}/> :
                        null
                    }
                </Suspense>
            </div>
        </div>
    );
};

export default FeedPage;