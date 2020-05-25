import { RelayModernEnvironment } from "relay-runtime/lib/store/RelayModernEnvironment";
import { Disposable, requestSubscription } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { GraphQLSubscriptionConfig, RecordProxy, ConnectionHandler } from "relay-runtime";

const newRepliesSubscription = graphql`
    subscription NewRepliesSubscription($clientSubscriptionId: String) {
        ReplyCreationSubscription(input: {clientSubscriptionId: $clientSubscriptionId}) {
            reply {
                id
                author {
                    name
                }
                content
                likes
                userHasLiked
                createdAt
                updatedAt
            }
            comment {
                id
            }
        }
    }
`;

const newRepliesSubscriptionModule = (environment: RelayModernEnvironment) => {
    let objDisposable: Disposable;

    const dispose = () => {
        if (objDisposable) objDisposable.dispose();
    };

    const subscribe = () => {
        objDisposable = requestSubscription(
            environment,
            generateSubscriptionConfigs()
        )
    };

    const generateSubscriptionConfigs = (): GraphQLSubscriptionConfig<{}> => {
        return {
            subscription: newRepliesSubscription,
            variables: {
                clientSubscriptionId: localStorage.getItem('authToken') + '5'
            },
            onNext: (response: any) => {
                console.log('response like subscription: ', response)
            },
            updater: store => {
                const replyNode = (store.getRootField('ReplyCreationSubscription') as RecordProxy<{}>).getLinkedRecord('reply');
                const commentNode = (store.getRootField('ReplyCreationSubscription') as RecordProxy<{}>).getLinkedRecord('comment') as RecordProxy<{}>;
                console.log('commentNode: ', commentNode);
                console.log('replyNode: ', replyNode);
                const repliesConnection = ConnectionHandler.getConnection(commentNode, 'RepliesTypeFragment_replies') as RecordProxy<{}>;
                const hasPreviousPage =  (repliesConnection.getLinkedRecord('pageInfo') as RecordProxy<{}>).getValue('hasPreviousPage');
                
                console.log('repliesConnection: ', repliesConnection);
                console.log('hasPreviousPage: ', hasPreviousPage);

                let replyEdge;
                if(store && repliesConnection && replyNode) {
                    replyEdge = ConnectionHandler.createEdge(store, repliesConnection, replyNode, 'ReplyTypeEdge');
                }
                if (!repliesConnection) {
                    // eslint-disable-next-line
                    console.log('maybe this connection is not in relay store: ', 'RepliesTypeFragment_replies');
                    return;
                }
                if (replyEdge && !hasPreviousPage) {
                    ConnectionHandler.insertEdgeBefore(repliesConnection, replyEdge);
                }
            }
        }
    };

    return {
        subscribe,
        dispose
    }

};

export default newRepliesSubscriptionModule