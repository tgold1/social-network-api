const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController.js');

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;