import React from 'react';
import graphql from 'babel-plugin-relay/macro';

import { RegisterForm } from './Components';
import { useMutation } from 'react-relay/lib/relay-experimental';

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
  const [commit, isInFlight] = useMutation(registerMutation);
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
      };
      commit({
        variables,
        onCompleted(data: any) {
          console.log(data);
        },
      });
    }
    if (isInFlight) {
      return (
        <div>
          'Loading...'
        </div>
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