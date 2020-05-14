import React from 'react';
import graphql from 'babel-plugin-relay/macro';

import { LoginForm } from './Components';
import { commitMutation } from 'react-relay';
import environment from 'src/relay/environment';

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
    let email = '';
    let password = '';
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const variables = {
            email,
            password
        }
        const disposable = commitMutation(
            environment,
            {
                mutation: loginMutation,
                variables,
                onCompleted: (response: any, errors) => {
                    console.log(response);
                    console.log(errors);
                    localStorage.setItem('authToken', response.Login.user.token);
                    alert('User logged in!');
                },
                onError: console.log
            }
            
        );
        console.log('disposable: ', disposable);
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