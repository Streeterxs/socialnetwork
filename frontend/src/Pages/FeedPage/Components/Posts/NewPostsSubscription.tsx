import graphql from "babel-plugin-relay/macro";
import { GraphQLSubscriptionConfig, RecordProxy, ConnectionHandler, ROOT_ID, Disposable } from "relay-runtime";
import { requestSubscription } from "react-relay";
import { RelayModernEnvironment } from "relay-runtime/lib/store/RelayModernEnvironment";

const postTypeSubscription = graphql`
subscription NewPostsSubscription {
    PostCreationSubscription(input: {clientSubscriptionId: "123"}) {
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

export const PostCreationSubscriptionModule = (environment: RelayModernEnvironment): {
    dispose: () => void,
    subscribe: () => void
} => {
    
    let config: GraphQLSubscriptionConfig<{}>;
    let objDisposable: Disposable;

    const dispose = () => {
        if (objDisposable) objDisposable.dispose();
    };

    const subscribe = () => {
        console.log('entrou subscribe');
        objDisposable = requestSubscription(
            environment,
            generatePostRequestSubscriptionConfig()
        );
    }

    const generatePostRequestSubscriptionConfig = ():  GraphQLSubscriptionConfig<{}> => {
        return {
            subscription: postTypeSubscription,
            variables: {clientSubscriptionId: "12"},
            onNext: (response: any) => {
                console.log('response ws: ', response)
            },
            updater: store => {
                const postNode = (store.getRootField('PostCreationSubscription') as RecordProxy<{}>).getLinkedRecord('post') as RecordProxy<{}>;
                const conn = ConnectionHandler.getConnection(store.get(ROOT_ID) as RecordProxy<{}>, 'PostsTypeFragment_myPosts') as RecordProxy<{}>;
                let postEdge = null;
                if (store && conn && postNode) {
                    postEdge = ConnectionHandler.createEdge(store, conn, postNode, 'PostTypeEdge');
                    console.log('postEdge: ', postEdge);
                }
                if (!conn) {
                // eslint-disable-next-line
                console.log('maybe this connection is not in relay store: ', 'PostsTypeFragment');
                return;
                }
                if (postEdge) {
                    ConnectionHandler.insertEdgeBefore(conn, postEdge);
                }
            }
        }
    }

    return {
        dispose,
        subscribe
    }
}