const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models')

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {

    },
    async createUser(req, res) {

    },
    async updateUser(req, res) {

    },
    async deleteUser(req, res) {

    },
    async addFriend(req, res) {

    },
    async deleteFriend(req, res) {

    }
}