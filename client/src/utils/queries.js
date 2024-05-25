import { gql } from '@apollo/client';

export const GET_LIST_BY_USER = gql`
    query getListsByUser($username: String!) {
        listsMemberedByUser(username: $username) {
            _id
            name
            owner
            description
            createdAt
            updatedAt
            version
        }
    }
`

export const GET_LISTS = gql`
    query getLists {
        lists {
            _id
            name
            description
            owner
        }
    }
`

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

export const GET_LIST_VERSION = gql`
    query getListVersion($id: ID!) {
        list(id: $id) {
            _id
            version
        }
    }
`