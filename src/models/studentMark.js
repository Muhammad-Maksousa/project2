const Student = require("./student");
const Subject = require("./subject");
const sequelize = require("../helpers/db/init");
const { DataTypes } = require("sequelize");
const StudentMark = sequelize.define("studentMark", {
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mark: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

StudentMark.belongsTo(Student, { foreignKey: "studentId" });
Student.hasMany(StudentMark, { foreignKey: "studentId" });

StudentMark.belongsTo(Subject, { foreignKey: "subjectId" });
Subject.hasMany(StudentMark, { foreignKey: "subjectId" });

module.exports = StudentMark;