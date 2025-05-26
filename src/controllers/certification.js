const CertificationService = require("../services/certification");
const CertTypeService = require("../services/certType");
const { ResponseSenderWithToken, updateResponseSender, responseSender } = require("../helpers/wrappers/response-sender");

module.exports = {
    create: async (req, res) => {
        const { body } = req;
        const cert = await new CertificationService({ ...body }).add();
        responseSender(res, cert);
    },
    update: async (req, res) => {
        const { body } = req;
        const cert = await new CertificationService({ ...body }).update(body.id);
        updateResponseSender(res, "Certification");
    },
    getAll: async (req, res) => {
        const cert = await new CertificationService({}).getAll();
        responseSender(res, cert);
    },
};