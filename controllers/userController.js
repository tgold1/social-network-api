const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
        .populate('thoughts')
        .populate('friends')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then((user) => 
              !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },

    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId })  
          .then((user) => 
            !user 
              ? res.status(404).json({ message: 'No user with that ID'})
              : res.json({ message: 'User successfully deleted'})
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
          .then((user) => 
            !user
              ? res.status(404).json({ message: 'No user with this ID!'})
              : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        console.log('You are adding a friend!');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body }},
            { runValidators: true, new: true }
        )
          .then((user) => 
            !user
              ? res
                .status(404)
                .json({ message: 'No user found with that ID!'})
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },

    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friend: { friendId: req.params.friendId}}},
            { runValidators: true, new: true }
        )
           .then((user) => 
              !user
                ? res
                  .status(404)
                  .json({ message: 'No user found with that ID!'})
                : res.json(user)
           )
           .catch((err) => res.status(500).json(err));
    },
};

module.exports = userController