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
                content
                author {
                    name
                }
            }
        }
    }
`;

const postTypeFragment = graphql`
    fragment PostTypeFragment on PostTypeEdge {
        cursor
        node {
            id
            author {
                name
            }
            content
            likes
            userHasLiked
            comments {
                ...CommentsTypeFragment
            }
            createdAt
            updatedAt
        }
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
    const [likes, setLikes] = useState(postEdge.node.likes);
    const [hasLiked, setHasLiked] = useState(postEdge.node.userHasLiked);
    
    const [commentCreationCommit, cmtCrtIsInFlight] = useMutation(commentCreationMutation);
    const [likeCrtCommit, likeCrtIsInFlight] = useMutation(postLikeMutation)

    const commentCreation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const variables = {
            content: commentContent,
            post: postEdge.node.id
        }
        commentCreationCommit({
            variables,
            onCompleted: (data: any) => {
                console.log(data);
            }
        });
    }

    const likesHandler = () => {
        setLikes(hasLiked ? likes - 1 : likes + 1);
        setHasLiked(hasLiked ? false : true);

        const variables = {
            postId: postEdge.node.id
        }

        console.log(variables);

        likeCrtCommit({
            variables,
            onCompleted: ({LikePost}: any) => {
                setLikes(LikePost.post.likes);
                setHasLiked(LikePost.post.userHasLiked);
            }
        });
    }
    return (
        <div className="w-full">
            <div className="rounded-lg overflow-hidden shadow-lg">
                <div className="px-6 py-2">
                    <p className="text-gray-800 text-base">
                        {postEdge.node.content}
                    </p>
                </div>
                <div className="text-gray-800 px-6 py-1 mb-2">
                    <span className="text-teal-600">
                        <FontAwesomeIcon icon={faThumbsUp} /> {likes}
                    </span>
                </div>
                <div className="px-4 py-2 mx-4 border-b-2 border-t-2 border-gray-300">
                    <span className={"cursor-pointer text-gray-800 " + (hasLiked ? 'text-teal-600' : '')} onClick={likesHandler}>
                        {
                            hasLiked ?
                            <><FontAwesomeIcon icon={faThumbsUp} /> Liked</> :
                            <><FontAwesomeIcon icon={faThumbsUp} /> Like</>
                        }
                    </span>
                </div>
                <div className="px-6">
                    <Suspense fallback="loading">
                        {
                            postEdge && postEdge.node.comments ?
                            <Comments comments={postEdge.node.comments}/> :
                            null 
                        }
                    </Suspense>
                </div>
                <div className="overflow-hidden w-full">
                    <CommentCreation formSubmit={commentCreation} commentContentChange={newContent => {
                        commentContent = newContent
                        }}/>
                </div>
            </div>
            {/* <div className="w-full">
                <div className="w-full">
                    {postEdge.node.content}
                </div>
                ({likes})<span onClick={likesHandler}>{hasLiked ? `Unlike` : 'Like'}</span>
            </div>
            <div>
                <Suspense fallback="loading">
                    {
                        postEdge && postEdge.node.comments ?
                        <Comments comments={postEdge.node.comments}/> :
                        null 
                    }
                </Suspense>
            </div> */}
        </div>
    );
};

export default Post;