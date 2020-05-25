import { subscriptionWithClientId } from 'graphql-relay-subscription';
import { withFilter } from 'graphql-subscriptions';

import PostType from '../PostType';
import { postLoader } from '../PostLoader';
import { IPost } from '../PostModel';
import { pubsub } from '../../../app';
import { loadUser } from '../../users/UserLoader';

const PostCreationSubscription = subscriptionWithClientId({
    name: 'PostCreationSubscription',
    inputFields: {},
    outputFields: {
        post: {
            type: PostType,
            resolve: async (post: IPost, _: any, context: any) => await postLoader(post.id)
        }
    },
    subscribe: withFilter((input: any, context: any) => {
        return pubsub.asyncIterator('newPost');
    }, async (postCreated: IPost, variables: any) => {
        const loggedUser = variables.user;
        const author = await loadUser(postCreated.author);

        return `${loggedUser._id}` === `${author._id}` || !!author.friends.includes(loggedUser._id);
    }),
    getPayload: async (obj: any) => ({
        id: obj.id
    })
});

export default PostCreationSubscription;