const StudentMark = require("../models/studentMark");
const Subject = require("../models/subject");


class StudentMarkService {
    constructor({ studentId, subjectId, mark }) {
        this.studentId = studentId;
        this.subjectId = subjectId;
        this.mark = mark;
    }
    async add(studentId, subjects) {
        let rows = [];
        subjects.forEach(subject => {
            let row = {
                studentId: studentId,
                subjectId: subject.id,
                mark: 0
            };
            rows.push(row);
        });
        return await StudentMark.bulkCreate(rows);
    }

    async delete(studentId) {
        return await StudentMark.destroy({ where: { studentId: studentId } });
    }

    async updateMark(id, mark, studentId) {
        await StudentMark.update({ mark: mark }, { where: { id: id } });
        return await StudentMark.findAll({ where: { studentId: studentId }, include: { model: Subject } });
    }

}
module.exports = StudentMarkService;
