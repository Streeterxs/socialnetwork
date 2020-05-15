import React from 'react';
import graphql from 'babel-plugin-relay/macro';

import { RegisterForm } from './Components';
import { commitMutation } from 'react-relay';
import environment from 'src/relay/environment';

const registerMutation = graphql`
  mutation RegisterPageLoginMutation($name: String!, $email: String!, $password: String!) {
    CreateUser(input: {name: $name, email: $email, password: $password, clientMutationId: "1"}) {
      user {
        name,
        email
      }
    }
  }
`;

const RegisterPage = () => {
    let name = '';
    let email = '';
    let password = '';
    const handleFormSubmition = (event: React.FormEvent<HTMLFormElement>) => {
        console.log(name);
        console.log(email);
        console.log(password);
        event.preventDefault();
        const variables = {
            name,
            email,
            password
        }
        const disposable = commitMutation(
            environment,
            {
                mutation: registerMutation,
                variables,
                onCompleted: (response: any, errors) => {
                    console.log(response);
                    console.log(errors);
                },
                onError: console.log
            }
            
        );
    }
    return (
        <RegisterForm
            nameChange={(nameReturned) => {name = nameReturned}}
            emailChange={(emailReturned) => {email = emailReturned}}
            passwordChange={(passwordReturned) => {password = passwordReturned}}
            formSubmit={handleFormSubmition}/>
    );
};

export default RegisterPage;