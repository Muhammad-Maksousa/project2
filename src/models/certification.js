const sequelize = require("../helpers/db/init");
const { DataTypes } = require("sequelize");
const Certification = sequelize.define("certification", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Certification;