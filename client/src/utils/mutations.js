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
    mutation createUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
    ) {
        createUser(
            firstName: $firstName
            lastName: $lastName
            username: $username
            email: $email
            password: $password
        ) {
            token
            user {
            _id
            }
        }
    }
`;

export const ADD_LIST = gql`
  mutation addList($name: String!, $description: String!) {
      addList(name: $name, description: $description) {
          _id
          name
          owner
          description
      }
  }
`;

export const DELETE_LIST = gql`
  mutation deleteList($listId: ID!) {
      deleteList(listId: $listId) {
          _id
          name
          owner
          description
      }
  }
`;

export const DUPLICATE_LIST = gql`
  mutation duplicateList($listId: ID!) {
      duplicateList(listId: $listId) {
          _id
          name
          owner
          description
      }
  }
`;