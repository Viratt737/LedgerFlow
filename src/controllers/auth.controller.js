const userModel = require('../Models/user.model');
const jwt = require('jsonwebtoken');

async function userRegisterController(req, res) {
    const { email, password, name } = req.body;

    const isExist = await userModel.findOne({ email: email });

    if (isExist) {
        return res.status(401).json({
            msg: "user exist with this email"
        });
    }

    const user = await userModel.create({
        email,
        password,
        name
    });

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    );

    res.cookie('token', token);

    res.status(201).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    });
}

async function userLoginController(req, res) {
    
}
module.exports = {
    userRegisterController
};