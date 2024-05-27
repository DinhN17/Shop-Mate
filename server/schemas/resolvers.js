const { User, List } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('ownedLists').populate('memberedLists');
        },

        user: async (parent, { username }) => {
            return await User.findOne({ username }).populate('ownedLists').populate('memberedLists');
        },

        listsByUser: async (parent, { username }) => {
            const data = await User.findOne({ username }).populate('ownedLists').populate('memberedLists');
            
            // console.log(lists);
            return data.ownedLists.concat(data.memberedLists);
        },

        listsOwnedByUser: async (parent, { username }) => {
            const lists = await User.findOne({ username }).populate('ownedLists');
            // console.log(lists.ownedLists);
            return lists.ownedLists;
        },

        listsMemberedByUser: async (parent, { username }) => {
            const lists = await User.findOne({ username }).populate('memberedLists');
            // console.log(lists);
            return lists.memberedLists;
        },

        lists: async () => {
            return await List.find();
        },

        list: async (parent, { listId }) => {
            return await List.findOne({_id: listId});
        },

        // query me: get information of the logged in user
        me: async (parent, args, context) => {
            console.log("context", context.user);
            
            if (context.user) {
                return await User.findOne({ _id: context.user._id }).populate('ownedLists').populate('memberedLists');
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },

    Mutation: {
        createUser: async (parent, { firstName, lastName, username, email, password}) => {
            const user = await User.create({ firstName, lastName, username, email, password});
            const token = signToken(user); 

            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
              }        

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError('Wrong Password');
              }
        
              const token = signToken(user);
        
              return { token, user };
        },
    //    createList: async (parent, { name, description, owner, members}) => {
    //        if (context.user) { 
    //         const list = await List.create({name, description, owner, members});
    //         return list; 
    //        }
            
    //     },
    // //     removeList: async (parent, { listId }) => {
    // //         return List.findOneAndDelete({ _id: listId });
    // //     },
    // //     editList: async (parent, { listId, name, description, members }) => {
    // //         const list =  List.findOneAndUpdate( 
    // //             listId,
    // //             { name, description, members },
    // //             { new: true }
    // //         );
    // //         if (!list) {
    // //             throw new Error("list not found.");
    // //         }; 
    // //         return list; 
    // //     },
    //     // addItemToList: async (parent, { listId, name, addedBy, description }) => {
    //     //     const newList = List.findByIdAndUpdate {
    //     //         listId, 
    //     //         { }
    //     //     }
    //     // },
    //     // removeItem: async (parent, { listId, itemId }) => {
    //     //     return Item.findOneAndDelete({ itemId })
    //     // },
    //     // editItem: async (parent, {listId, itemId, name, description }) => {
            
    //     // },

    },
};

module.exports = resolvers;