import React, { Suspense, useState } from 'react';
import { Comments, CommentCreation } from '../';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'

import { useFragment } from 'react-relay/hooks';
import { useMutation } from 'react-relay/lib/relay-experimental';
import graphql from 'babel-plugin-relay/macro';



const commentCreationMutation = graphql`
    mutation PostCommentCreationMutation($content: String!, $post: String!) {
        CreateComment(input: {content: $content, post: $post, clientMutationId: "2"}) {
            comment {
                id
                content
                author {
                    name
                }
            }
        }
    }
`;

const postTypeFragment = graphql`
    fragment PostTypeFragment on PostType @argumentDefinitions(
        first: {type: "Int"}
        last: {type: "Int"}
        before: {type: "String"}
        after: {type: "String"}
    ) {
        id
        author {
            name
        }
        content
        likes
        userHasLiked
        createdAt
        updatedAt
        ...CommentsTypeFragment @arguments(
            first: $first,
            last: $last,
            before: $before,
            after: $after
        )
    }
`;

const postLikeMutation = graphql`
    mutation PostLikeMutation($postId: String!) {
        LikePost(input: {post: $postId, clientMutationId: "5"}) {
            post {
                likes
                userHasLiked
            }
        }
    }
`;

const Post = ({post}: any) => {
    let commentContent = '';

    const postEdge = useFragment(postTypeFragment, post);

    const [likes, setLikes] = useState(postEdge.likes);
    const [hasLiked, setHasLiked] = useState(postEdge.userHasLiked);
    
    const [commentCreationCommit, cmtCrtIsInFlight] = useMutation(commentCreationMutation);
    const [likeCrtCommit, likeCrtIsInFlight] = useMutation(postLikeMutation)

    const commentCreation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const variables = {
            content: commentContent,
            post: postEdge.id
        }
        commentCreationCommit({
            variables,
            onCompleted: (data: any) => {
            }
        });
    }

    const likesHandler = () => {
        setLikes(hasLiked ? likes - 1 : likes + 1);
        setHasLiked(hasLiked ? false : true);

        const variables = {
            postId: postEdge.id
        }

        likeCrtCommit({
            variables,
            onCompleted: ({LikePost}: any) => {
                setLikes(LikePost.post.likes);
                setHasLiked(LikePost.post.userHasLiked);
            }
        });
    };


    return (
        <div className="w-full">
            <div className="rounded-lg overflow-hidden shadow-custom">
                <div className="py-4">
                    <div className="px-6 py-2">
                        <small>
                            <b>
                                {postEdge.author.name}
                            </b>
                        </small>
                        <p className="text-gray-800 text-base my-3">
                            {postEdge.content}
                        </p>
                    </div>
                    <div className="text-gray-800 px-6 py-1 mb-2">
                        <span className="text-teal-600">
                            <FontAwesomeIcon icon={faThumbsUp} /> {likeCrtIsInFlight ? likes : postEdge.likes}
                        </span>
                    </div>
                    <div className="px-4 py-2 mx-4 border-b-2 border-t-2 border-gray-300">
                        <span className={"cursor-pointer text-gray-800 " + ((likeCrtIsInFlight ? hasLiked : postEdge.userHasLiked) ? 'text-teal-600' : '')} onClick={likesHandler}>
                            {
                                (likeCrtIsInFlight ? hasLiked : postEdge.userHasLiked) ?
                                <><FontAwesomeIcon icon={faThumbsUp} /> Liked</> :
                                <><FontAwesomeIcon icon={faThumbsUp} /> Like</>
                            }
                        </span>
                    </div>
                    <div className="px-6">
                        <Suspense fallback="loading">
                            {
                                postEdge && postEdge ?
                                <Comments comments={postEdge}/> :
                                null 
                            }
                        </Suspense>
                    </div>

                </div>
                <div className="overflow-hidden w-full">
                    <CommentCreation formSubmit={commentCreation} commentContentChange={newContent => {
                        commentContent = newContent
                        }}/>
                </div>
            </div>
        </div>
    );
};

export default Post;