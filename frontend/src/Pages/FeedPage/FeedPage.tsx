import React, { Suspense, useEffect } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';

import {Posts, PostCreation} from './Components'
import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'react-relay/lib/relay-experimental';
import { useHistory } from 'react-router';
import environment from 'src/relay/environment';
import SubscriptionModule from 'src/Services/Subscriptions';


const postCreationMutation = graphql`
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


const FeedPage = ({userIsLogged} : {
    userIsLogged: boolean
}) => {
    useEffect(() => {
        const subscriptionModule = SubscriptionModule(environment);
        subscriptionModule.subscribeAll();
        return () => {
            subscriptionModule.disposeAll();
        }
    }, [environment]);

    const history = useHistory();
    useEffect(() => {
        if (userIsLogged) {
            return;
        }
        history.push('/login');
    }, [userIsLogged]);

    const [commit, isInFlight] = useMutation(postCreationMutation);
    const userPostsQuery: any = useLazyLoadQuery(graphql`
        query FeedPageMyselfQuery {
            ...PostsTypeFragment
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
            }
        });
    }

    return (
        <Suspense fallback={() => {
            return (
                "is Loading"
            )
        }}>
            <div className="flex items-center justify-center">
                <div className="w-8/12">
                    <div className="w-full mb-5">
                        {
                            isInFlight ? 'Loading' : null
                        }
                        <PostCreation contentChange={(postContent: string) => {content = postContent}} formSubmit={handlePostFormCreationSubmit}/>
                    </div>
                    <div className="w-full">
                        <Suspense fallback={() => {
                            return (
                                "is Loading"
                            )
                        }}>
                            {
                                userPostsQuery && userPostsQuery ?
                                <Posts posts={userPostsQuery}/> :
                                null
                            }
                        </Suspense>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default FeedPage;