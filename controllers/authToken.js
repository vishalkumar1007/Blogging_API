const jwt = require("jsonwebtoken");


/*
generate the JWT 
API is : http://localhost:3000/blog/generateToken 
Method : DELETE
*/
const generateToken = async (req, res) => {
    const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
    const data = {
        time: Date(),
        userId: 12,
    }
    const token = jwt.sign(data, jwtSecretKey);
    res.status(201).json({ token: `${token}`, success: true });
}

const authenticateToken = async (req, res, next) => {

    try {
        const token = req.headers.authorization;
        if (token == null) return res.status(401).json({ message: "token null", success: false });

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Token verification failed", success: false });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error verification failed", success: true });
    }
}

module.exports = {
    authenticateToken,
    generateToken
};
