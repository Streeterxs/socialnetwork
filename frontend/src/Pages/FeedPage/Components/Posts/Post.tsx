import React, { Suspense, useState } from 'react';
import { Comments, CommentCreation } from '../';

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
        <div>
            <div>
                <div>
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
                <CommentCreation formSubmit={commentCreation} commentContentChange={newContent => {
                    commentContent = newContent
                    }}/>
            </div>
        </div>
    );
};

export default Post;