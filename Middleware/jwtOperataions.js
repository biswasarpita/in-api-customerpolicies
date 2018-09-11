const jwt = require('../Utils/jwt');

module.exports.jwtDecode = (req, res, next) => {
    const payload = jwt.decode(req.headers.authorization);
    res.locals.mdmId = payload.mdmId;
    next();
};

module.exports.jwtSign = (req, res) => {
    res.send(jwt.sign({ mdmId: req.params.mdmId }));
};

module.exports.jwtVerify = (req, res, next) => {
    try {
        const result = jwt.verify(String(req.headers.authorization).toString());
        if (result.mdmId) {
            res.locals.mdmId = result.mdmId;
            next();
        }
    } catch (error) {
        res.status(400).send({
            status: 'Error',
            message: error.message
        });
    }
};