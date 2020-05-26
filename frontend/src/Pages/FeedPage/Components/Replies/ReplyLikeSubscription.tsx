import { RelayModernEnvironment } from "relay-runtime/lib/store/RelayModernEnvironment";
import { Disposable, requestSubscription } from "react-relay";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import graphql from "babel-plugin-relay/macro";

const replyLikeSubscription = graphql `
    subscription ReplyLikeSubscription($clientSubscriptionId: String) {
        ReplyLikeSubscription(input: {clientSubscriptionId: $clientSubscriptionId}) {
            reply {
                id
                likes
            }
        }
    }
`;

const ReplyLikeSubscriptionModule = (environment: RelayModernEnvironment) => {
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

    const generateSubscriptionConfigs = (): GraphQLSubscriptionConfig<{}> => ({
        subscription: replyLikeSubscription,
        variables: {
            clientSubscriptionId: localStorage.getItem('authToken') + '10'
        },
        onNext: (response: any) => {
            console.log('response like subscription: ', response)
        }
    });

    return {
        dispose,
        subscribe
    };
};

export default ReplyLikeSubscriptionModule