const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController.js');

router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;