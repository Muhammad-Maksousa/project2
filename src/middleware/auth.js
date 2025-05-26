let jwt = require('jsonwebtoken');
const secretKey = require("../helpers/db/config.secret");
const CustomError = require("../helpers/errors/custom-errors");
const errors = require("../helpers/errors/errors.json");
const AdminService = require('../services/admin');
verifyToken = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token)
        throw new CustomError(errors.No_Token_Provided);
    await jwt.verify(token, secretKey, async (err, decoded) => {
        if (err)
            throw new CustomError(errors.Internal_Server_Error);
        const user = await new AdminService({}).getById(decoded.userId);
        if (!user)
            throw new CustomError(errors.Not_Authorized);
        req.adminId = user.id;
        req.isAdmin = user.isAdmin;
        next();
    });
};
verifyAdminToken = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token)
        throw new CustomError(errors.No_Token_Provided);
    await jwt.verify(token, secretKey, async (err, decoded) => {
        if (err)
            throw new CustomError(errors.Internal_Server_Error);

        const user = await new AdminService({}).getById(decoded.userId);

        if (user.isAdmin == false)
            throw new CustomError(errors.Not_Authorized);

        req.adminId = user.id;
        req.isAdmin = user.isAdmin;
        next();
    });
};
module.exports = {
    verifyToken: verifyToken,
    verifyAdminToken: verifyAdminToken,
};