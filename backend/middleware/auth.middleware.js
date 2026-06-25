import jwt from "jsonwebtoken";

export const authenticate = (req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:'no token provided'});
    }

    const token=authHeader.split(' ')[1];

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        res.status(401).json({message:'invalid token'});
    }
}

export const authorize= (role) => {
    return (req, res, next) => {

        if(!req.user){
            return res.status(401).json({ message: 'user not logged in' });
        }

        if (req.user.role !== role) {
            return res.status(403).json({ message: 'forbidden access' });
        }

        next();
    }
};

export const authorizeAdminAndParticularStudent= (req, res, next) => {
    const userId = req.params?.studentId || req.body?.studentId || req.params?.id;

    if(!req.user){
        return res.status(401).json({ message: 'user not logged in' });
    }

    if (req.user.role === "student" && String(req.user.userId) !== String(userId)) {
        return res.status(403).json({ message: 'forbidden access' });
    }

    next();
}

export const authorizeParticularUser= (req, res, next) => {
    const userId=req.params.id;
    const tokenUserId = req.user?.userId || req.user?._id;

    if(!req.user){
        return res.status(401).json({ message: 'user not logged in' });
    }

    if (String(tokenUserId) !== String(userId)) {
        return res.status(403).json({ message: 'forbidden access' });
    }

    next();
}