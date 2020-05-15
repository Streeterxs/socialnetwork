import React from 'react';
import { Comment, CommentCreation } from './';

const Comments = () => {
    return (
        <div>
            <div>
                Comments Component...
            </div>
            <div>
                <Comment/>
            </div>
            <div>
                <CommentCreation/>
            </div>
        </div>
    );
};

export default Comments;