const SubjectService = require("../services/subject");
const { ResponseSenderWithToken, updateResponseSender, responseSender } = require("../helpers/wrappers/response-sender");

module.exports = {
    create: async (req, res) => {
        const { body } = req;
        const result = await new SubjectService({ ...body }).add();
        responseSender(res, result);
    },
    update: async (req, res) => {
        const { body } = req;
        const result = await new SubjectService({ ...body }).update(body.id);
        updateResponseSender(res, "Subject");
    },
    getAll: async (req, res) => {
        const result = await new SubjectService({}).getAll();
        responseSender(res, result);
    },
    getAllByCertTypeId: async (req, res) => {
        const { certTypeId } = req.params;
        const result = await new SubjectService({}).getAllByCertTypeId(certTypeId);
        responseSender(res, result);
    },
};