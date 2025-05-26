const DataEntryService = require("../services/dataEntry");
const { ResponseSenderWithToken, updateResponseSender, responseSender } = require("../helpers/wrappers/response-sender");

module.exports = {
    create: async (req, res) => {
        const { body } = req;
        const result = await new DataEntryService({ ...body }).add();
        responseSender(res, "Data Entry Created Successfully");
    },
    update: async (req, res) => {
        const { body } = req;
        const result = await new DataEntryService({ ...body }).update(body.id);
        updateResponseSender(res, "Data Entry");
    },
    login: async (req, res) => {
        const { body } = req;
        const result = await new DataEntryService({ ...body }).login();
        ResponseSenderWithToken(res, result.user, result.token);
    },
    getAll: async (req, res) => {
        const result = await new DataEntryService({}).getAll();
        responseSender(res, result);
    },
    getOne: async (req, res) => {
        const { id } = req.params;
        const result = await new DataEntryService({}).getById(id);
        responseSender(res, result);
    },
    block: async (req, res) => {
        const { id } = req.params;
        await new DataEntryService({}).block(id);
        responseSender(res, "The DataEntry Has Been Blocked");
    },
    unBlock: async (req, res) => {
        const { id } = req.params;
        await new DataEntryService({}).unBlock(id);
        responseSender(res, "The DataEntry Has Been Unblocked");
    },
};