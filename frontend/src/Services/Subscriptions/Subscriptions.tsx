import { RelayModernEnvironment } from "relay-runtime/lib/store/RelayModernEnvironment";

import {
    NewPostsSubscriptionModule,
    PostLikeSubscriptionModule,

    NewCommentsSubscriptionModule,
    CommentLikeSubscriptionModule,

    NewRepliesSubscriptionModule,
    ReplyLikeSubscriptionModule
} from './'

const SubscriptionModule = (environment: RelayModernEnvironment) => {
    const newPostsSubscriptionModule = NewPostsSubscriptionModule(environment);
    const postLikeSubscriptionModule = PostLikeSubscriptionModule(environment);

    const newCommentsSubscriptionModule = NewCommentsSubscriptionModule(environment);
    const commentLikeSubscriptionModule = CommentLikeSubscriptionModule(environment);

    const newRepliesSubscriptionModule = NewRepliesSubscriptionModule(environment);
    const replyLikeSubscriptionModule = ReplyLikeSubscriptionModule(environment);

    const disposeAll = () => {
        newPostsSubscriptionModule.dispose()
        postLikeSubscriptionModule.dispose()
        newCommentsSubscriptionModule.dispose()
        commentLikeSubscriptionModule.dispose()
        newRepliesSubscriptionModule.dispose()
        replyLikeSubscriptionModule.dispose()
    }

    const subscribeAll = () => {
        newPostsSubscriptionModule.subscribe()
        postLikeSubscriptionModule.subscribe()
        newCommentsSubscriptionModule.subscribe()
        commentLikeSubscriptionModule.subscribe()
        newRepliesSubscriptionModule.subscribe()
        replyLikeSubscriptionModule.subscribe()
    }

    return {
        newPostsSubscriptionModule,
        postLikeSubscriptionModule,
        newCommentsSubscriptionModule,
        commentLikeSubscriptionModule,
        newRepliesSubscriptionModule,
        replyLikeSubscriptionModule,
        disposeAll,
        subscribeAll
    }
};

export default SubscriptionModule