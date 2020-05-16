import React, { Suspense } from 'react';
import { Reply, ReplyCreation } from './';

const Replies = () => {
    return (
        <div>
            <div>
                Replies Component...
            </div>
            <div>
                <Suspense fallback="loaging...">
                    <Reply/>
                </Suspense>

            </div>
            <div>
                <ReplyCreation/>
            </div>
        </div>

    );
};

export default Replies;