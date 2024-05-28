const typeDefs = `
    type User {
        _id: ID
        firstName: String
        lastName: String
        username: String
        email: String
        password: String
        ownedLists: [List]
        memberedLists: [List]
    }

    type List {
        _id: ID
        name: String
        description: String
        owner: String
        items: [Item]
        createdAt: String
        updatedAt: String
        version: Int
    }

    type Item {
        _id: ID
        name: String
        description: String
        addedBy: String
        boughtBy: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        listsByUser(username: String!): [List]
        listsOwnedByUser(username: String!): [List]
        listsMemberedByUser(username: String!): [List]
        lists: [List]
        list(listId: ID!): List
        me: [List]
    }

    type Mutation { 
        createUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        
        addItemToList(listId: ID!, name: String!, addedBy: String!, description: String ): List
        removeItem(listId: ID!, itemId: ID!): List
        editItem(listId: ID!, itemId: ID!, name: String, description: String): Item
        buyItem(listId: ID!, itemId: ID!, boughtBy: String): List 
        addList(name: String!, description: String!): List       
        deleteList(listId: ID!): List
        duplicateList(listId: ID!): List
    }
`;
//  createList(name: String!, description: String, owner: User, members:[String]): List
// removeList(listId: ID!, owner: User): List
// editList(listId: ID!, name: String!, description: String): List

// addItemToList:(listId: ID!, name: String!, addedBy: User!, description: String ): List
// removeItem(listId: ID!, itemId: ID!): List
// editItem(listId: ID!, itemId: ID!, name: String, description: String): Item
// buyItem(listId: ID!, itemId: ID!, boughtBy: User): List

module.exports = typeDefs;