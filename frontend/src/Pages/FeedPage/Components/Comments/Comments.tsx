import React, { Suspense } from 'react';
import { Comment, CommentCreation } from './';

const Comments = () => {
    return (
        <div>
            <div>
                Comments Component...
            </div>
            <div>
                <Suspense fallback="loading">
                    <Comment/>
                </Suspense>
            </div>
            <div>
                <CommentCreation/>
            </div>
        </div>
    );
};

export default Comments;