const { validateToken } = require("../services/userService");

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-authorization'];
    if(token){
        try {
            const user = validateToken(token);
            req.user = {
                'email': user.email,
                '_id': user._id,
                token
            }
        } catch (error) {
            console.log(error)
        }
    }
    next();
}

module.exports = {
    authMiddleware,
}
