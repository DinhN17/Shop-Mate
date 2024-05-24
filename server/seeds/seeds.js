const db = require('../config/connection');
const { User, List } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');
    await cleanDB('List', 'lists');

    // User Data
    const user1 = await User.create({
      firstName: 'Pamela',
      lastName: 'Washington',
      username: 'pamwashington',
      email: 'pamela@testmail.com',
      password: 'password12345',
    });

    const user2 = await User.create({
      firstName: 'Elijah',
      lastName: 'Holt',
      username: 'eliholt',
      email: 'eholt@testmail.com',
      password: 'password12345',
    });

    console.log('users seeded');

    // Create lists
    const list1 = await List.create({
      name: 'Grocery List',
      description: 'Monthly Shopping List',
      owner: user1.username,
      // members: [user1._id, user2._id],
      items: [],
    });

    user1.ownedLists.push(list1._id);
    user1.memberedLists.push(list1._id);
    user2.memberedLists.push(list1._id);
    
   

    const list2 = await List.create({
      name: 'Shopping List',
      description: 'Weekly Shopping List',
      owner: user2.username,
      // members: [user2._id],
      items: [],
    });

    user2.ownedLists.push(list2._id);
    user2.memberedLists.push(list2._id);

    await user1.save();
    await user2.save();

    console.log('Lists seeded!');

    // Create items
    // const item1 = await Item.create({
    //   name: 'Milk',
    //   description: '1 gallon of milk',
    //   addedBy: user1._id,
    //   boughtBy: null,
    // });

    // const item2 = await Item.create({
    //   name: 'Bread',
    //   description: 'Whole wheat bread',
    //   addedBy: user2._id,
    //   boughtBy: user1._id,
    // });

    // Add items to list
    list1.items.push(
      {
        name: 'Milk',
        description: '1 gallon of milk',
        addedBy: user1.username,
        boughtBy: null,
      },
      {
        name: 'Bread',
        description: 'Whole wheat bread',
        addedBy: user2.username,
        boughtBy: user1.username,
      });
    await list1.save();

    console.log('Items seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
