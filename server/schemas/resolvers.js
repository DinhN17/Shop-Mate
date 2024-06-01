const { PiUserBold } = require('react-icons/pi');
const { User, List } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('ownedLists').populate('memberedLists');
        },

        user: async (parent, { username }) => {
            return await User.findOne({ username }).populate('ownedLists').populate('memberedLists');
        },

        userByEmail: async (parent, { email }) => {
            console.log(email);
            return await User.findOne({ email });
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
            // console.log("context", context.user);
            
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id }).populate('memberedLists');
                return user;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },

    Mutation: {
        createUser: async (parent, { firstName, lastName, username, email, password }) => {
            try {
                // Create a new user in the database
                const user = await User.create({ firstName, lastName, username, email, password });
                
                // Sign a JWT token with the new user's data
                const token = signToken(user);

                // Return the token and user data
                return { token, user };
            } catch (error) {
                console.error(error);
                throw new AuthenticationError('Error creating user');
            }
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

        removeItem: async (parent, { listId, itemId }, context) => {

            // check if user is logged in
            if (context.user) {
                // check if the user owns the list
                const list = await List.findOne({ _id: listId });
                if (!list) {
                    throw new Error("list not found");
                };

                if (list.owner !== context.user.username) {
                    throw new Error("user not authorized");
                };

                // remove the item from the list
                const updatedList = await List.findOneAndUpdate(
                    { _id: listId },
                    { $pull: { items: { _id: itemId } } },
                    { new: true }
                );

                return updatedList;
            }
            const list = await List.findOne({ _id: listId });
            return Item.findOneAndDelete({ itemId });
        },

        buyItem: async (parent, { listId, itemId }, context) => {

            // check if user is logged in
            if (context.user) {
                // update item's boughtBy
                const updatedList = await List.updateOne(
                    { _id: listId, 'items._id': itemId },
                    { $set: { 'items.$.boughtBy': context.user.username } },
                    { new: true }
                );
                return updatedList;

            }
        },

        // Add Item to List
        addItem: async (parent, { listId, name, description }, context) => {

            console.log("add item", listId);
            // check if user is logged in
            if (context.user) {
                console.log("check", context.user.username);
                // check if the user is a member of the list
                const list = await List.findOneAndUpdate(
                    { _id: listId },
                    { $addToSet: { items: { name: name, description: description, addedBy: context.user.username } } },
                    { new: true }
                );
                console.log("list", list);
                if (!list) {
                    throw new Error("list not found");
                };

                // if(!list.members.includes(context.user.username)) {
                //     throw new Error("user not authorized");
                // };

                // console.log("check", list.members);
                // console.log(name, description, context.user.username);

                // add the item to the list
                // const List = await List.updateOne(
                //     { _id: listId },
                //     { $addToSet: { items: { name, description, addedBy: context.user.username } } },
                //     { new: true }
                // );

                // console.log(List);
                return List;
            }
        },
        
        addList: async (parent, { name, description }, context) => {

            if (context.user.username) { 

                const owner = context.user.username;
                const list = await List.create({name, description, owner});
                console.log(list);
                // update new list to user information
                if (!list) {
                    throw new Error("list failed to create");
                };
                const listId = new mongoose.mongo.ObjectId(list._id);
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { 
                        $addToSet: { 
                            ownedLists: listId,
                            memberedLists: listId 
                        }
                    },
                    { new: true }
                );

                // console.log(updatedUser);

                if (!updatedUser) {
                    throw new Error("user not found");
                };
                return list; 
            };
            
        },

        deleteList: async (parent, { listId }, context) => {
            if (context.user.username) {
                // check if the user owns the list
                const list = await List.findOne({ _id: listId });
                if (list.owner !== context.user.username) {
                    throw new Error("you don't have permission to delete this list");
                }

                // delete the list
                const deletedList = await List.findOneAndDelete({ _id: listId });

                if (!deletedList) {
                    throw new Error("list not found");
                };

                // update user information
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { 
                        $pull: { 
                            ownedLists: listId,
                            memberedLists: listId 
                        }
                    },
                    { new: true }
                );
                return deletedList;
            };
        },

        // duplicateList: create a new list from information of a list, remove boughtBy of Items
        duplicateList: async (parent, { listId }, context) => {
            if (context.user.username) {
                const list = await List.findOne({ _id: listId });
                if (!list) {
                    throw new Error("list not found");
                };
                let { name, description, owner, items } = list;
                // remove boughtBy of Items
                items.map(item => item.boughtBy = null);
                // update owner
                owner = context.user.username;
                // update members
                members = [context.user.username];
                // update name
                name = `${name} - Copy`;
                // create new list
                const newList = await List.create({name, description, owner, members, items});
                // update user information
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { 
                        $addToSet: { 
                            ownedLists: newList._id,
                            memberedLists: newList._id 
                        }
                    },
                    { new: true }
                );
                return newList;
            };
        },

        // shareListWithFriend: share a list with a friend
        shareListWithFriend: async (parent, { listId, friendUsername }, context) => {
            if (context.user.username) {
                // check if list exists
                const list = await List.findOne({ _id: listId });
                if (!list) {
                    throw new Error("list not found");
                };

                // check if friend exists
                const friend = await User.findOne({ username: friendUsername });
                if (!friend) {
                    throw new Error("friend not found");
                };

                // update list information
                const updatedList = await List.findOneAndUpdate(
                    { _id: listId },
                    { $addToSet: { members: friend.username } },
                    { new: true }
                );

                // update friend information, in future it should be get confirm from friend
                const updatedUser = await User.findOneAndUpdate(
                    { _id: friend._id },
                    { $addToSet: { memberedLists: listId } },
                    { new: true }
                );
                return updatedList;
            };
        }
    },
};

module.exports = resolvers;