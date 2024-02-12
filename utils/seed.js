const connection = require('../config/connection');
const { User, Thought } = require('../models');
//const { getUser } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    let userCheck = await connection.db.listCollections({name: 'users'}).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({name: 'thoughts'}).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }
    const users = []

    const thoughtSeeds = [
        {thoughtText: 'thought 1', username: 'test1', reactions: []},
        {thoughtText: 'thought 2', username: 'test2', reactions: []},
        {thoughtText: 'thought 3', username: 'test3', reactions: []},
        {thoughtText: 'thought 4', username: 'test4', reactions: []},
        {thoughtText: 'thought 5', username: 'test5', reactions: []},
        {thoughtText: 'thought 6', username: 'test6', reactions: []},
        {thoughtText: 'thought 7', username: 'test7', reactions: []},
        {thoughtText: 'thought 8', username: 'test8', reactions: []},
        {thoughtText: 'thought 9', username: 'test9', reactions: []},
    ]

    const thoughtData = await Thought.insertMany(thoughtSeeds);

    const userSeeds = [
        {username: 'test1', email: 'test1@gmail.com', thoughts: [thoughtData[0]._id], friends: []},
        {username: 'test2', email: 'test2@gmail.com', thoughts: [thoughtData[1]._id], friends: []},
        {username: 'test3', email: 'test3@gmail.com', thoughts: [thoughtData[2]._id], friends: []},
        {username: 'test4', email: 'test4@gmail.com', thoughts: [thoughtData[3]._id], friends: []},
        {username: 'test5', email: 'test5@gmail.com', thoughts: [thoughtData[4]._id], friends: []},
        {username: 'test6', email: 'test6@gmail.com', thoughts: [thoughtData[5]._id], friends: []},
        {username: 'test7', email: 'test7@gmail.com', thoughts: [thoughtData[6]._id], friends: []},
        {username: 'test8', email: 'test8@gmail.com', thoughts: [thoughtData[7]._id], friends: []},
        {username: 'test9', email: 'test9@gmail.com', thoughts: [thoughtData[8]._id], friends: []},
    ]

    const userData = await User.insertMany(userSeeds);



    console.log(userData);
    console.log(thoughtData);

    console.log('Seeding complete')
    process.exit(0);

})