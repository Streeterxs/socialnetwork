import { subscriptionWithClientId } from 'graphql-relay-subscription';

import PostType from '../PostType';
import { postLoader } from '../PostLoader';
import { IPost } from '../PostModel';
import { pubsub } from '../../../app';

const PostCreationSubscription = subscriptionWithClientId({
    name: 'PostCreationSubscription',
    inputFields: {},
    outputFields: {
        post: {
            type: PostType,
            resolve: async (post: IPost, _: any, context: any) => await postLoader(post.id)
        }
    },
    subscribe: (input: any, context: any) => {
        console.log(input);
        return pubsub.asyncIterator('newPost');
    },
    getPayload: async (obj: any) => ({
        id: obj.id
    })
});

const PostCreation = {
    type: PostCreationSubscription.type,
    args: PostCreationSubscription.args,
    subscribe: PostCreationSubscription.subscribe,
    resolve: async (...args: any[]) => await PostCreationSubscription.resolve(...args)
}

export default PostCreationSubscription;