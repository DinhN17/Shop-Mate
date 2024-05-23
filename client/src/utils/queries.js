import { gql } from '@apollo/client';

export const GET_LIST_BY_USER = gql`
    query getListsByUser($username: String!) {
        listsByUser(username: $username) {
            ownedLists
            memberLists
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
        list(id: $id) {
            _id
            name
            description
            owner
            members
            items
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