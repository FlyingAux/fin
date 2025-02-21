const jwt = require('jsonwebtoken');

const auth = function( req,res,next){
    const token = req.headers('Authorization');
    if(!token) return res.status(401).json({error: 'Access Denied'});

    try{
        const verify = jwt.verify(token.split(" ")[1], processe.env.JWT_SECRET);
        req.user = verify
        next();
    }
    catch(err){
        res.status(401).json({error: 'Ivalid token'});
    }
};


// Role authorization

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied. Insufficient permissions." });
        }
        next();
    };
};


module.exports = { auth, checkRole };