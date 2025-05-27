const AdminService = require("../services/admin");
const DataEntryService = require("../services/dataEntry");
const CertificationService = require("../services/certification");
const CertTypeService = require("../services/certType");
const { ResponseSenderWithToken, updateResponseSender, responseSender } = require("../helpers/wrappers/response-sender");

module.exports = {
    add: async (req, res) => {
        const { body } = req;
        const result = await new AdminService({ ...body }).add();
        responseSender(res, result);
    },
    update: async (req, res) => {
        const id = req.adminId;
        const { body } = req;
        await new AdminService({ ...body }).update(id);
        updateResponseSender(res, 'Admin');
    },
    login: async (req, res) => {
        const { body } = req;
        const result = await new AdminService({ ...body }).login();
        ResponseSenderWithToken(res, result.user, result.token);
    },
    getCities: async (req, res) => {
        const result = await new AdminService({}).getCities();
        responseSender(res, result);
    },
    createYear: async (req, res) => {
        const { body } = req;
        const result = await new AdminService({}).createYear(body.value);
        responseSender(res, result);
    },
    getYears: async (req, res) => {
        const result = await new AdminService({}).getYears();
        responseSender(res, result);
    }
};
