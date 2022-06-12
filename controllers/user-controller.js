//REQUIURE
const { User, Thought } = require('../models');

//User Controller
const userController = {

    //CREATE - new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    //GET - all users
    getAllUsers(req, res) {
        User.find({})
            //POPULATE users thoughts
            .populate({ path: 'thoughts', select: '-__v' })
            //POPULATE user friends
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //GET - single user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            //ERROR MSG - if no user found
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this ID' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    //UPDATE - current user by ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            //ERROR MSG
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },

    //DELETE - current user by ID
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            //ERROR MSG
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this ID' });
                    return;
                }
                //Remove the user from friends list
                User.updateMany({ _id: { $in: dbUserData.friends } }, { $pull: { friends: params.id } })
                .then(() => {
                    //Remove any thoughts from unfriended user
                    Thought.deleteMany({ username: dbUserData.username })
                    //SUCCESS MSG
                    .then(() => { res.json({ message: 'User has been successfully deleted' }) })
                    .catch(err => res.status(400).json(err));
                })
                .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    },

    //ADD - a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $push: { friends: params.friendId } }, { new: true })
            .populate({ path: 'friends', select: ('-__v') })
            .select('-__v')
            .then(dbUserData => {
                //ERROR MSG
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //DELETE - current friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { new: true })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            //ERROR MSG
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }

};

//EXPORT
module.exports = userController; 