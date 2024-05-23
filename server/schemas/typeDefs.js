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
        owner: User
        members: [User]
        items: [Item]
        createdAt: String 
        updatedAt: String
        version: Int
        concurrentlyViewing: Int
    }
    type Item {
        _id: ID
        name: String
        description: String
        addedBy: User
        createdAt: String
        updatedAt: String
        boughtBy: User
    }

    Query {
        users: [User]
        user: User
        lists: [List]
        list(_id: ID!): List   
        items: [Item]
        item(_id: ID!): Item
    }

    Mutation { 
        createUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        createList(name: String!, description: String, owner: User, members: [User]): List
        removeList(listId: ID!): List
        editList(listId: ID!, name: String!, description: String, members: [User]): List

        addItemToList:(listId: ID!, name: String!, addedBy: User!, description: String, ): List
        removeItem(listId: ID!, itemId: ID!): List
        editItem(listId: ID!, itemId: ID!, name: String, description: String): Item 
    }
`;

module.exports = typeDefs;