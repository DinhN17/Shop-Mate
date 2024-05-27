import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
    mutation createUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!){
        createUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password){
            token
            user {
              _id
              username
            }
            firstName
            lastName
            email
       }
    }
`;

export const ADD_LIST = gql`
    mutation addList($name: String!, $description: String!, $owner: String!) {
        addList(name: $name, description: $description, owner: $owner) {
            _id
            name
            description
            owner
        }
    }
`;