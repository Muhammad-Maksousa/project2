const sequelize = require("../helpers/db/init");
const { DataTypes } = require("sequelize");
const eYear = sequelize.define("eYear", {
    value: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = eYear;