const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models')

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne( {_id: req.params.userId})
                .select('-__v');
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                {runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(user);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({_id: req.params.userId })

            if (!user) {
                return res.status(404).json({message: 'No user with this id!'})
            }

            res.json({ message: 'User successfully deleted'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }

    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                {runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json( {message: 'No user with this id!'})
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }

    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: {userId: req.params.friendId }}},
                { runValidators: true, new: true }  
            );

            if (!user) {
                return res.status(404).json( {message: 'No user with this id!'})
            }
            res.json(user)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}