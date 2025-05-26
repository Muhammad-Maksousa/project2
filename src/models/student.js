const sequelize = require("../helpers/db/init");
const eYear = require("./eYear");
const CertType = require("./certType");
const { DataTypes } = require("sequelize");
const Student = sequelize.define("student", {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    motherName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    school: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    result: {
        type: DataTypes.STRING,
        defaultValue: "-"
    },
    totalMark: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    eYearId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    certTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    indexes: [{
        unique: true,
        fields: ['eYearId', 'number','certTypeId']
    }]
});


    


Student.belongsTo(eYear, { foreignKey: "eYearId" });
eYear.hasMany(Student, { foreignKey: "eYearId" });

Student.belongsTo(CertType, { foreignKey: "certTypeId" });
CertType.hasMany(Student, { foreignKey: "certTypeId" });

module.exports = Student;