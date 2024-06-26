import { gql } from '@apollo/client';

export const GET_USERNAME_BY_EMAIL = gql`
    query getUsernameByEmail($email: String!) {
        userByEmail(email: $email) {
            _id
            username
        }
    }
`
export const GET_LISTS_BY_ME = gql`
    query me {
        me {
            _id
            memberedLists {
                _id
                name
                description
                owner
                members
            }
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

// get a signle list
export const GET_LIST = gql`
    query getList($id: ID!) {
        list(listId: $id) {
            name
            description
            owner
            members
            updatedAt
            items {
                name
                description
                boughtBy
                addedBy
                _id
            }
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