const User = require("../models/user");
const CustomError = require("../helpers/errors/custom-errors");
const errors = require("../helpers/errors/errors.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = require("../helpers/db/config.secret");
const City = require("../models/city");
const eYear = require("../models/eYear");

class AdminService {
    constructor({ username, password }) {
        this.username = username;
        this.password = password;
        this.isAdmin = true;
    }
    async add() {
        if (!this.username || !this.password) {
            throw new CustomError(errors.You_Should_fill_All_The_Filds)
        }
        return await User.create({
            username: this.username,
            password: this.password,
            isAdmin: true
        });
    }
    async update(id) {
        return await User.update({
            username: this.username,
            password: this.password,
        }, { where: { id: id } });
    }
    async login() {
        if (!this.username || !this.password) {
            throw new CustomError(errors.You_Should_fill_All_The_Filds);
        }
        const user = await User.findOne({ where: { username: this.username } });
        //const user = await User.findOne({ where: { username: this.username }, include: [{model:Wallet,model:StorageAdmin}] });
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
        return await User.findByPk(id);
    }
    async getCities() {
        return await City.findAll({ attributes: ['id', 'name'], order: [['id', 'ASC']] });
    }
    async createYear(value) {
        return await eYear.create({ value: value });
    }
    async getYears() {
        return await eYear.findAll({ attributes: ['id', 'value'] });
    }
}
module.exports = AdminService;
