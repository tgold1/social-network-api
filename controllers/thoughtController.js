const { Thought, User } = require('../models');

const thoughtController = {
    getThoughts(req, res) {
        Thought.find()
        .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },

    getSingleThought({params}, res) {
        Thought.findOne({_id: params.thoughtId})
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .then((dbThoughtData => dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: 'No thought with that ID' }))  
              
              
            )
            .catch((err) => res.status(500).json(err));
    },

    createThought({body}, res) {
        Thought.create({ thoughtText: body.thoughtText, username: body.username })
          .then(({_id}) => User.findOneAndUpdate({_id: body.userId}, { $push: { thoughts: _id}}, { new:true}))
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch((err) => res.status(500).json(err));
          
    },

    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId })  
          .then(dbThoughtData => dbThoughtData ? res.json({ message: 'Thought successfully deleted'}(dbThoughtData._id)) : res.status(404).json({ message: 'No thought with that ID'}))
           
    
      
          .catch((err) => 
            res.status(500).json(err)
          );
    },

    updateThought({params}, res) {
        Thought.findOneAndUpdate( {_id: params.thoughtId }, body, { new: true, runValidators: true})
        
          .then((dbThoughtData => dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: 'No thought with this ID!'} ))  
            
        )
        .catch((err) => res.status(500).json(err));
    },

    addReaction({params, body}, res) {
        console.log('You are adding a reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: {reactionBody: body.reactionBody, username: body.username} }},
            { runValidators: true, new: true }
        )
          .then(dbThoughtData => dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: 'No thought found with that ID!'})
    
          )
          .catch((err) => res.status(500).json(err));
    },

    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId}}},
            { new: true }
        )
           .then(dbThoughtData => dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: 'No thought found with that ID!'})
           )
           .catch((err) => res.status(500).json(err));
    },
};

module.exports = thoughtController

