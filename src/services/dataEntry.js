const User = require("../models/user");
const CustomError = require("../helpers/errors/custom-errors");
const errors = require("../helpers/errors/errors.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = require("../helpers/db/config.secret");

class DataEntryService {
    constructor({ username, password }) {
        this.username = username;
        this.password = password;
    }
    async add() {
        if (!this.username || !this.password) {
            throw new CustomError(errors.You_Should_fill_All_The_Filds)
        }
        return await User.create({
            username: this.username,
            password: this.password,
        });
    }
    async update(id) {
        return await User.update({
            password: this.password,
        }, { where: { id: id } });
    }
    async login() {
        if (!this.username || !this.password) {
            throw new CustomError(errors.You_Should_fill_All_The_Filds);
        }
        const user = await User.findOne({ where: { username: this.username } });
        if (!user)
            throw new CustomError(errors.Entity_Not_Found);

        let passwordIsValid = bcrypt.compareSync(this.password, user.password);

        if (!passwordIsValid)
            throw new CustomError(errors.Wrong_Password);

        let token = jwt.sign({ userId: user.id }, secretKey, {
            expiresIn: 86400 * 720 // 2 years
        });

        const response = {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            isBlocked: user.isBlocked
        }

        return { user: response, token: token }
    }
    async getById(id) {
        return await User.findOne({ where: { id: id }, attributes: ['id', 'username', 'isBlocked'] });
    }
    async getAll() {
        return await User.findAll({ where: { isAdmin: false }, attributes: ['id', 'username', 'isBlocked'] });
    }
    async block(id) {
        return await User.update({ isBlocked: true }, { where: { id: id } });
    }
    async unBlock(id) {
        return await User.update({ isBlocked: false }, { where: { id: id } });
    }
}
module.exports = DataEntryService;
