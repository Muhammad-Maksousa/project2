const { Op } = require("sequelize");
const CertType = require("../models/certType");
const eYear = require("../models/eYear");
const Student = require("../models/student");
const StudentMark = require("../models/studentMark");
const Subject = require("../models/subject");

class StudentService {
    constructor({ fullName, motherName, school, eYearId, certTypeId, number }) {
        this.fullName = fullName;
        this.motherName = motherName;
        this.school = school;
        this.eYearId = eYearId;
        this.certTypeId = certTypeId;
        this.number = number;
    }
    async add() {
        return await Student.create({
            fullName: this.fullName,
            motherName: this.motherName,
            school: this.school,
            eYearId: this.eYearId,
            certTypeId: this.certTypeId,
            number: this.number
        });
    }
    async update(id) {
        return await Student.update({
            fullName: this.fullName,
            motherName: this.motherName,
            school: this.school,
            eYearId: this.eYearId,
            number: this.number
        }, { where: { id: id } });
    }
    async getStudent(eYearId, number) {
        return await Student.findOne({ where: { number: number, eYearId: eYearId } });
    }
    async updateResult(id, result) {
        return await Student.update({ result: result }, { where: { id: id } });
    }

    async updateTotalMarks(id, subjects) {
        let newMark = 0, minMarkToPass = 0, numberOfFiledSubjects = 0, result = "Passed";
        subjects.forEach(subject => {
            newMark += subject.mark;
            minMarkToPass += subject.subject.minMark;
            if (subject.mark < subject.subject.minMark)
                numberOfFiledSubjects++;
        });

        if (newMark < minMarkToPass || numberOfFiledSubjects >= 2)
            result = "Failed"
        return await Student.update({ totalMark: newMark, result: result }, { where: { id: id } });
    }

    async delete(id) {
        return await Student.destroy({ where: { id: id } });
    }

    async getOne(eYearId, certTypeId, number) {
        return await Student.findOne({
            where: { [Op.and]: [{ eYearId: eYearId }, { certTypeId: certTypeId }, { number: number }] },
            attributes: ['id', 'fullName', 'motherName', 'school', 'result', 'totalMark', 'number'],
            include: [
                {
                    model: StudentMark,
                    attributes: ['id', 'mark'],
                    include: { model: Subject, attributes: ['name', 'minMark', 'maxMark'] }
                },
                {
                    model: eYear,
                    attributes: ['value']
                },
                {
                    model: CertType,
                    attributes: ['name']
                }
            ]
        });
    }

}
module.exports = StudentService;
