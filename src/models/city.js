const sequelize = require("../helpers/db/init");
const { DataTypes } = require("sequelize");
const City = sequelize.define("city", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = City;