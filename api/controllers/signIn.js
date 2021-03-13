const UserServices = require('../services/user');

const signIn = async (req, res) => {
  try {
    const payload = req.body;
    const { token, username, userId, role } = await UserServices.signInUser(
      payload
    );
    res.status(200).json({
      success: true,
      token: token,
      username: username,
      userId: userId,
      role: role,
    });
  } catch (error) {
    res.status(401).send({ message: error.message });
    return;
  }
};

module.exports = signIn;
