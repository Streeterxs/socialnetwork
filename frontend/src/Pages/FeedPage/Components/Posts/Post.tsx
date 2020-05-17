import React, { Suspense } from 'react';
import { Comments } from '../';

import { useFragment } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';


const Post = ({post}: any) => {
    const postEdge = useFragment(graphql`
        fragment PostTypeFragment on PostTypeEdge {
            cursor
            node {
                author {
                    name
                }
                content
                likes
                comments {
                    ...CommentsTypeFragment
                }
            }
        }
    `,
    post);
    console.log(postEdge);
    return (
        <div>
            <div>
                {postEdge.node.content}
            </div>
            <div>
                <Suspense fallback="loading">
                    {
                        postEdge && postEdge.node && postEdge.node.comments ?
                        <Comments comments={postEdge.node.comments}/> :
                        null
                    }
                </Suspense>
            </div>
        </div>
    );
};

export default Post;