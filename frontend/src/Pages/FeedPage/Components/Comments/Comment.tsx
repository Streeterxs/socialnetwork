import React, { Suspense } from 'react';
import { Replies } from '../';

const Comment = () => {
    return (
        <div>
            <div>
                Comment Component...
            </div>
            <div>
                <Suspense fallback="loading...">
                    <Replies/>
                </Suspense>
            </div>
        </div>
    );
};

export default Comment