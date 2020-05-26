import graphql from "babel-plugin-relay/macro";
import { Disposable, requestSubscription } from "react-relay";
import { RelayModernEnvironment } from "relay-runtime/lib/store/RelayModernEnvironment";
import { GraphQLSubscriptionConfig, ConnectionHandler, RecordProxy, ROOT_ID } from "relay-runtime";

const postLikeSubscription = graphql`
    subscription PostLikeSubscription ($clientSubscriptionId: String!) {
        PostLikeSubscription(input: {clientSubscriptionId: $clientSubscriptionId}) {
            post {
                id
                likes
            }
        }
    }
`

const PostLikeSubscriptionModule = (environment: RelayModernEnvironment) => {
    let objDisposable: Disposable;


    const dispose = () => {
        if (objDisposable) objDisposable.dispose();
    };

    const subscribe = () => {
        objDisposable = requestSubscription(
            environment,
            generateSubscriptionConfig()
        );
    };

    const generateSubscriptionConfig = (): GraphQLSubscriptionConfig<{}> => {
        return {
            subscription: postLikeSubscription,
            variables: {clientSubscriptionId: localStorage.getItem('authToken') + '2'},
            onNext: (response: any) => {
                console.log('response like subscription: ', response)
            }
        }

    }

    return {
        dispose,
        subscribe
    }

}

export default PostLikeSubscriptionModule;