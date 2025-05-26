const sequelize = require("../helpers/db/init");
const Certification = require("./certification");
const City = require("./city");
const { DataTypes } = require("sequelize");
const CertType = sequelize.define("certType", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    certId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});


CertType.belongsTo(City, { foreignKey: "cityId" });
City.hasMany(CertType, { foreignKey: "cityId" });

CertType.belongsTo(Certification, { foreignKey: "certId" });
Certification.hasMany(CertType, { foreignKey: "certId" });

module.exports = CertType;