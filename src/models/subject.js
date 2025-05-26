const CertType  = require("./certType");
const sequelize = require("../helpers/db/init");
const { DataTypes } = require("sequelize");
const Subject = sequelize.define("subject", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    maxMark:{
        type : DataTypes.INTEGER,
        allowNull : false
    },
    minMark : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    certTypeId : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
});


Subject.belongsTo(CertType, {foreignKey: "certTypeId"});
CertType.hasMany(Subject, {foreignKey: "certTypeId"});

module.exports = Subject;