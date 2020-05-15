import React from 'react';
import {Posts, PostCreation} from './Components'

const FeedPage = () => {
    return (
        <div>
            <div>
                Feed Page
            </div>
            <div>
                <PostCreation/>
            </div>
            <div>
                <Posts/>
            </div>
        </div>
    );
};

export default FeedPage;