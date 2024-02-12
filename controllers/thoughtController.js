const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models')

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne( {_id: req.params.thoughtId})
                .select('-__v');
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                {runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thought);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId })

            if (!thought) {
                return res.status(404).json({message: 'No thought with this id!'})
            }

            res.json({ message: 'Thought successfully deleted'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {

    },
    async deleteReaction(req, res) {
        
    }
}