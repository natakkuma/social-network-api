//REQUIRE
const router = require('express').Router();

//thoughts-controller REQUIREMENTS
const { 
    getAllThoughts, 
    getThoughtById, 
    createThought, 
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts - GET all
router
    .route('/')
    .get(getAllThoughts);

// /api/thoughts/:id - GET one, PUT, and Delete 
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought); 

// /api/thoughts/:userId - POST 
router
    .route('/:userId')
    .post(createThought);

// /api/thoughts/:thoughtId/reactions - POST 
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughts/:thoughtId/reactionId - DELETE 
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

//EXPORT
module.exports = router;