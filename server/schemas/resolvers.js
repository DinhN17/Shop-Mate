const { User, List } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        user: async (parent, { User }) => {
            return await User.findOne({ User });
        },
        lists: async () => {
            return await List.find();
        },
        list: async (parent, { ID }) => {
            return await List.findOne({_id: ID});
        },
        items: async () => {
            return await Item.find();
        },
        item: async (parent, { ID }) => {
            return await Item.findOne({_id:ID});
        }
    },

    // Mutation: {
    //     createUser: async (parent, { firstName, lastName, username, email, password}) => {
    //         const user = await User.create({ firstName, lastName, username, email, password});
    //         const token = signToken(user); 

    //         return {token, user};
    //     },
    //     login: async (parent, {email, password}) => {
    //         const user = await User.findOne({ email });

    //         if (!user) {
    //             throw AuthenticationError; 
    //         }

    //     },
    //     createList: async (parent, { name, description, owner, members }) => {
    //         const list = await List.create({name, description, owner, members});

    //         return list; 
    //     },
    //     removeList: async (parent, { listId }) => {
    //         return List.findOneAndDelete({ _id: listId });
    //     },
    //     editList: async (parent, { listId, name, description, members }) => {
    //         const list =  List.findOneAndUpdate( 
    //             listId,
    //             { name, description, members },
    //             { new: true }
    //         );
    //         if (!list) {
    //             throw new Error("list not found.");
    //         }; 
    //         return list; 
    //     },
    //     addItemToList: async (parent, { listId, name, addedBy, description }) => {
    //         const newList = List.findByIdAndUpdate {
    //             listId, 
    //             { }
    //         }
    //     },
    //     removeItem: async (parent, { listId, itemId }) => {
    //         return Item.findOneAndDelete({ itemId })
    //     },
    //     editItem: async (parent, {listId, itemId, name, description }) => {
            
    //     },

    // },
};