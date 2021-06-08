const destroy = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return next(err);
        }
        })
        next()
};

module.exports = destroy;