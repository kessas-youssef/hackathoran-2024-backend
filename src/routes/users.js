const { Router } = require('express');
const User = require('../database/models/User');
const { validateRequestBody } = require('../utils/helpers');

const router = Router();


router.get('/users', async (req, res, next) => {
    try {
        let users = await User.find();

        // To Client
        if (users.length > 0)
            return res.status(200).json({ message: 'All users retreived successfully', content: users });

        throw { message: 'No users found', status: 404 }
    } catch (error) { next(error) }
})

router.post('/addUser', validateRequestBody, async (req, res, next) => {
    try {

        const isUserExists = await User.findOne({ email: req.body.email })
        if (isUserExists)
            throw { message: 'Already existing', content: {...isUserExists}, status: 409 }

        const user = new User({ ...req.body })
        const savedUser = await user.save();

        res.status(201).json({ message: 'User created successfully', content: { ...savedUser } });

    } catch (error) {
        next(error);
    }
});


router.delete('/deleteUser', validateRequestBody, async (req, res, next) => {
    try {

        // User [
        const user = await User.findOneAndDelete({ email: userEmail })

        if (!user)
            throw { message: 'Not found: User not found', status: 404 }
        // User ]

        // To Client
        res.status(200).json({ message: 'User deleted successfully', content: { ...user } });

    } catch (error) {
        next(error);
    }
});

router.delete('/deleteAll', async (req, res, next) => {
    try {

        const users = await User.deleteMany({})

        res.status(200).json({ message: 'ALL Users deleted successfully', content: { ...users } });

    } catch (error) { next(error); }
});


module.exports = router;
