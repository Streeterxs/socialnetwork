import React, { Suspense, useEffect } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';

import {Posts, PostCreation} from './Components'
import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'react-relay/lib/relay-experimental';
import { useHistory } from 'react-router';


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
    const history = useHistory();
    useEffect(() => {
        console.log('Entrou feed page');
        console.log('loggedUser: ', userIsLogged);
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
                console.log(data);
            }
        });
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-8/12">
                <div className="w-full mb-5">
                    {
                        isInFlight ? 'Loading' : null
                    }
                    <PostCreation contentChange={(postContent: string) => {content = postContent}} formSubmit={handlePostFormCreationSubmit}/>
                </div>
                <div className="w-full">
                    <Suspense fallback="loading...">
                        {
                            userPostsQuery && userPostsQuery ?
                            <Posts posts={userPostsQuery}/> :
                            null
                        }
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default FeedPage;