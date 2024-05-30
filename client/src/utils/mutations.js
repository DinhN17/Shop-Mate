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

// Define SHARE_LIST_WITH_FRIEND mutation
export const SHARE_LIST_WITH_FRIEND = gql`
  mutation shareListWithFriend($listId: ID!, $friendUsername: String!) {
    shareListWithFriend(listId: $listId, friendUsername: $friendUsername) {
      _id
      name
      members
    }
  }
`;

// Define the REMOVE_ITEM mutation
export const REMOVE_ITEM = gql`
  mutation removeItem($listId: ID!, $itemId: ID!) {
    removeItem(listId: $listId, itemId: $itemId) {
      _id
      name
      items {
        _id
        name
        description
        addedBy
        boughtBy
      }
    }
  }
`;

// Define the EDIT_ITEM mutation
export const EDIT_ITEM = gql`
  mutation editItem($listId: ID!, $itemId: ID!, $name: String, $description: String) {
    editItem(listId: $listId, itemId: $itemId, name: $name, description: $description) {
      _id
      name
      description
      addedBy
      boughtBy
    }
  }
`;

// Define the BUY_ITEM mutation
export const BUY_ITEM = gql`
  mutation buyItem($listId: ID!, $itemId: ID!) {
    buyItem(listId: $listId, itemId: $itemId) {
      _id
      name
      items {
        _id
        name
        description
        addedBy
        boughtBy
      }
    }
  }
`;