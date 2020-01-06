const User = require('../models/User');

//  @desc Register a user
//  @route POST /api/v1/auth/register
//  @access Public
exports.register = async (req, res, next) => {

    try {
        const { name, email, password, role } = req.body;

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        //create token
        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            token
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            msg: err.message
        });
    }

};

//  @desc Login user
//  @route POST /api/v1/auth/login
//  @access Public
exports.login = async (req, res, next) => {

    try {
        const { email, password} = req.body;

        //validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "please provide an email and password"
            });
        }

        //check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                msg: "Invalid credentials"
            });
        }

        //check if password mathces
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                msg: "Invalid credentials"
            });
        }

        //create token
        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            token
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            msg: err.message
        });
    }

};
