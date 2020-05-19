import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'react-relay/lib/relay-experimental';

import { RegisterForm } from './Components';

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
  const history = useHistory();

  const [commit, isInFlight] = useMutation(registerMutation);
  let name = '';
    let email = '';
    let password = '';
    const handleFormSubmition = (event: React.FormEvent<HTMLFormElement>) => {

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
          history.push('/login');
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