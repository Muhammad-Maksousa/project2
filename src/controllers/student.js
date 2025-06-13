const StudentService = require("../services/student");
const SubjectService = require("../services/subject");
const StudentMarkService = require("../services/studentMark");
const sequelize = require("../helpers/db/init");
const CustomError = require("../helpers/errors/custom-errors");
const errors = require("../helpers/errors/errors.json");
const { ResponseSenderWithToken, updateResponseSender, responseSender } = require("../helpers/wrappers/response-sender");

module.exports = {
    create: async (req, res) => {
        const { body } = req;
        const student = await new StudentService({ ...body }).add();
        const subjects = await new SubjectService({}).getAllByCertTypeId(body.certTypeId);
        await new StudentMarkService({}).add(student.id, subjects);
        responseSender(res, "Student Was Created Successfully");
    },
    update: async (req, res) => {
        const { body } = req;
        const cert = await new StudentService({ ...body }).update(body.id);
        updateResponseSender(res, "Student");
    },
    getAll: async (req, res) => {
        const result = await new StudentService({}).getAll();
        responseSender(res, result);
    },
    getOne: async (req, res) => {
        const { eYearId, certTypeId, number } = req.params;
        const student = await new StudentService({}).getOne(eYearId, certTypeId, number);
        // TODO  put redisClient in try catch
        //await req.redisClient.setex(req.path, 3600, JSON.stringify(student));
        responseSender(res, student);
    },
    delete: async (req, res) => {
        const transaction = await sequelize.transaction({ autocommit: false });
        try {
            const { studentId } = req.params;
            await new StudentMarkService({}).delete(studentId, transaction);
            await new StudentService({}).delete(studentId, transaction);
            await transaction.commit();
            responseSender(res, "The Student Was Deleted Successfully");
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            throw new CustomError(errors.Internal_Server_Error);
        }
    },
    updateMark: async (req, res) => {
        const { body } = req;
        if (Number(body.mark) == NaN)
            throw new CustomError(errors.Mark_Invalid);
        const marks = await new StudentMarkService({}).updateMark(body.id, body.mark, body.studentId);
        await new StudentService({}).updateTotalMarks(body.studentId, marks);
        updateResponseSender(res, "Mark");
    }
};