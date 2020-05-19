import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'react-relay/lib/relay-experimental';

import { LoginForm } from './Components';

const loginMutation = graphql`
  mutation LoginPageLoginMutation($email: String!, $password: String!) {
    Login(input: {email: $email, password: $password, clientMutationId: "1"}) {
      user {
        name
        token
      }
    }
  }
`;

const LoginPage = ({setUserIsLogged}: {
    setUserIsLogged: (userIsLogged: boolean) => void
}) => {
    const history = useHistory();

    const [commit, isInFlight] = useMutation(loginMutation);

    let email = '';
    let password = '';

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUserIsLogged(true);

        const variables = {
            email,
            password
        }
        commit({
            variables,
            onCompleted: (data: any) => {
                console.log(data);
                localStorage.setItem('authToken', data.Login.user.token);
                setUserIsLogged(data.Login.user.token ? true : false);
                history.push('/');
            }
        })
    }
    if (isInFlight) {
        return(
            <div>
                Loading...
            </div>
        );
    }
    return (
        <div>
            <LoginForm
                emailChange={(emailReturned) => {email = emailReturned}}
                passwordChange={(passwordReturned) => {password = passwordReturned}}
                formSubmit={handleSubmit}
            />
        </div>
    );
}

export default LoginPage;