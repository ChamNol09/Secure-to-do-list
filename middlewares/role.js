const authoriz = (...roles) => (req, res, next) =>{
    if(!roles.includes(req.user.role)){
        return res.json({
            result: false,
            msg: "Forbidden access denied",
        })
    }
    next();
}
module.exports = {
    authoriz
}