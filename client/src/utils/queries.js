import { gql } from '@apollo/client';


export const GET_LISTS_BY_ME = gql`
  query me {
    me {
      lists {
        _id
        name
        description
        owner
        items {
          _id
          name
          description
          addedBy
          boughtBy
        }
      }
    }
  }
`;

export const GET_LIST = gql`
  query getList($id: ID!) {
    list(listId: $id) {
      _id
      name
      description
      owner
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
// get a signle list
export const GET_LIST = gql`
    query getList($id: ID!) {
        list(listId: $id) {
            name
            owner
            updatedAt
            items {
                name
                description
                boughtBy
                addedBy
                _id
            }
            description
        }
    }
`

// get updatedAt of a list with listId
export const GET_LIST_UPDATED_AT = gql`
    query getListUpdatedAt($id: ID!) {
        list(listId: $id) {
            updatedAt
        }
    }
`

export const GET_LIST_VERSION = gql`
    query getListVersion($id: ID!) {
        list(id: $id) {
            _id
            version
        }
    }
`