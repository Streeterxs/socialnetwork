import { RelayModernEnvironment } from "relay-runtime/lib/store/RelayModernEnvironment";
import graphql from "babel-plugin-relay/macro";
import { Disposable, requestSubscription } from "react-relay";
import { GraphQLSubscriptionConfig } from "relay-runtime";

const commentLikeSubscription = graphql `
    subscription CommentLikeSubscription($clientSubscriptionId: String) {
        CommentLikeSubscription(input: {clientSubscriptionId: $clientSubscriptionId}) {
            comment {
                id,
                likes
            }
        }
    }
`;

const CommentLikeSubscriptionModule = (environment: RelayModernEnvironment) => {
    let objDisposable: Disposable;

    const dispose = () => {
        if (objDisposable) objDisposable.dispose();
    }

    const subscribe = () => {
        objDisposable = requestSubscription(
            environment,
            generateSubscriptionConfig()
        )
    }

    const generateSubscriptionConfig = (): GraphQLSubscriptionConfig<{}> => ({
        subscription: commentLikeSubscription,
        variables: {
            clientSubscriptionId: localStorage.getItem('authToken' + '8')
        },
        onNext: (response: any) => {
            console.log('response ws comment!: ', response)
        }
    });

    return {
        subscribe,
        dispose
    }
};

export default CommentLikeSubscriptionModule