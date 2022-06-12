//REQUIRE
const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

//USE
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

//EXPORT
module.exports = router;