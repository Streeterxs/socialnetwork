import graphql from "babel-plugin-relay/macro";
import { GraphQLSubscriptionConfig, RecordProxy, ConnectionHandler, ROOT_ID, Disposable } from "relay-runtime";
import { requestSubscription } from "react-relay";
import { RelayModernEnvironment } from "relay-runtime/lib/store/RelayModernEnvironment";

const postTypeSubscription = graphql`
subscription NewPostsSubscription ($clientSubscriptionId: String!) {
    PostCreationSubscription(input: {clientSubscriptionId: $clientSubscriptionId}) {
        post {
            id
            author {
                name
            }
            content
            likes
            userHasLiked
            createdAt
            updatedAt
            ...CommentsTypeFragment
        }
    }
}
`;

const PostCreationSubscriptionModule = (environment: RelayModernEnvironment): {
    dispose: () => void,
    subscribe: () => void
} => {
    
    let config: GraphQLSubscriptionConfig<{}>;
    let objDisposable: Disposable;

    const dispose = () => {
        if (objDisposable) objDisposable.dispose();
    };

    const subscribe = () => {
        objDisposable = requestSubscription(
            environment,
            generatePostRequestSubscriptionConfig()
        );
    }

    const generatePostRequestSubscriptionConfig = ():  GraphQLSubscriptionConfig<{}> => {
        return {
            subscription: postTypeSubscription,
            variables: {clientSubscriptionId: localStorage.getItem('authToken')+'1'},
            onNext: (response: any) => {
                console.log('response ws: ', response)
            },
            updater: store => {
                const postNode = (store.getRootField('PostCreationSubscription') as RecordProxy<{}>).getLinkedRecord('post') as RecordProxy<{}>;
                
                const conn = ConnectionHandler.getConnection(store.getRoot() as RecordProxy<{}>, 'PostsTypeFragment_myPosts') as RecordProxy<{}>;
                
                const myPosts = (store.get(ROOT_ID) as RecordProxy<{}>).getLinkedRecord('myPosts') as RecordProxy<{}>;
                
                let postEdge = null;
                if (store && (conn || myPosts) && postNode) {
                    postEdge = ConnectionHandler.createEdge(store, conn, postNode, 'PostTypeEdge');
                }
                if (!conn) {
                // eslint-disable-next-line
                console.log('maybe this connection is not in relay store: ', 'PostsTypeFragment');
                return;
                }
                if (postEdge) {
                    ConnectionHandler.insertEdgeBefore((conn ? conn : myPosts), postEdge);
                }
            }
        }
    }

    return {
        dispose,
        subscribe
    }
}

export default PostCreationSubscriptionModule