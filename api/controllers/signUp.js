const UserServices = require('../services/user');

const signUp = async (req, res) => {
    try {
        const newUser = req.body;
        const savedUser = await UserServices.registerUser(newUser);

        res.status(200).json({
            success: true,
            data: savedUser,
        });

    } catch (error) {
        res.status(400).send({ message: error.message });
        return;
    }
};

module.exports = signUp;