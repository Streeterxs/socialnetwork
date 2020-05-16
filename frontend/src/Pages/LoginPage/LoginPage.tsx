import React from 'react';
import graphql from 'babel-plugin-relay/macro';

import { LoginForm } from './Components';
import { useMutation } from 'react-relay/lib/relay-experimental';

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

const LoginPage = () => {
    const [commit, isInFlight] = useMutation(loginMutation);

    let email = '';
    let password = '';

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const variables = {
            email,
            password
        }
        commit({
            variables,
            onCompleted: (data: any) => {
                console.log(data);
                localStorage.setItem('authToken', data.Login.user.token);
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