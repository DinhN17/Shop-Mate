import { qpl } from '@apollo/client';

export const GET_LIST_BY_USER = qpl`
    query getListsByUser($username: String!) {
        listsByUser(username: $username) {
            ownedLists
            memberLists
        }
    }
`

export const GET_LISTS = qpl`
    query getLists {
        lists {
            _id
            name
            description
            owner
        }
    }
`

export const GET_LIST = qpl`
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

export const GET_LIST_VERSION = qpl`
    query getListVersion($id: ID!) {
        list(id: $id) {
            _id
            version
        }
    }
`