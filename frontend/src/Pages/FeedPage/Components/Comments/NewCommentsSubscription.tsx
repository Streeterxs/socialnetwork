import { RelayModernEnvironment } from "relay-runtime/lib/store/RelayModernEnvironment";
import graphql from "babel-plugin-relay/macro";
import { Disposable, requestSubscription } from "react-relay";
import { GraphQLSubscriptionConfig, RecordProxy, ConnectionHandler, ROOT_ID } from "relay-runtime";

const commentsCreationSubscription = graphql`
    subscription NewCommentsSubscription($clientSubscriptionId: String) {
        CreateCommentSubscription(input :{clientSubscriptionId: $clientSubscriptionId}) {
            comment {
                id
                content
                author {
                    name
                }
            }
            post {
                id
            }
        }
    }
`;

const NewCommentsSubscription = (environment: RelayModernEnvironment) => {
    let objDisposable: Disposable;

    const dispose = () => {
        if (objDisposable) objDisposable.dispose()
    };

    const subscribe = () => {
        objDisposable = requestSubscription(
            environment,
            generateSubscriptionConfigs()
        )
    };

    const generateSubscriptionConfigs = (): GraphQLSubscriptionConfig<{}> => {
        return {
            subscription: commentsCreationSubscription,
            variables: {clientSubscriptionId: localStorage.getItem('authToken') + '3'},
            onNext: (response: any) => {
                console.log('response ws comment!: ', response)
            },
            updater: store => {
                const commentNode = (store.getRootField('CreateCommentSubscription') as RecordProxy<{}>).getLinkedRecord('comment') as RecordProxy<{}>;
                const post = (store.getRootField('CreateCommentSubscription') as RecordProxy<{}>).getLinkedRecord('post') as RecordProxy<{}>;
                const conn = ConnectionHandler.getConnection(post, 'CommentsTypeFragment_comments') as RecordProxy<{}>;
                const hasNextPage =  (conn.getLinkedRecord('pageInfo') as RecordProxy<{}>).getValue('hasNextPage');
                let commentEdge = null;
                if (store && conn && commentNode) {
                    commentEdge = ConnectionHandler.createEdge(store, conn, commentNode, 'CommentTypeEdge');
                }
                if (!conn) {
                // eslint-disable-next-line
                console.log('maybe this connection is not in relay store: ', 'CommentsTypeFragment_comments');
                return;
                }
                if (commentEdge && !hasNextPage) {
                    ConnectionHandler.insertEdgeAfter(conn, commentEdge);
                }
            }
        }
    };

    return {
        dispose,
        subscribe
    }
};

export default NewCommentsSubscription