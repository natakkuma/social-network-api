//REQUIRE
const router = require('express').Router();

//users-constrollers REQUIREMENTS
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// /api/users - GET all and POST 
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:id - GET one, PUT, and DELETE
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId - POST and DELETE
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

//EXPORT
module.exports = router; 