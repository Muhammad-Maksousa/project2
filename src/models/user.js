const sequelize = require("../helpers/db/init");
let bcrypt = require("bcryptjs");
const { DataTypes } = require("sequelize");
const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('password', bcrypt.hashSync(value, 8));
        }
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue : false,
    },
    isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue : false,
    }
});
module.exports = User;