const CertTypeService = require("../services/certType");
const { ResponseSenderWithToken, updateResponseSender, responseSender } = require("../helpers/wrappers/response-sender");

module.exports = {
    create: async (req, res) => {
        const { body } = req;
        const certType = await new CertTypeService({ ...body }).add();
        responseSender(res, certType);
    },
    update: async (req, res) => {
        const { body } = req;
        const certType = await new CertTypeService({ ...body }).update(body.id);
        updateResponseSender(res, "Type");
    },
    getAll: async (req, res) => {
        const result = await new CertTypeService({}).getAll();
        responseSender(res, result);
    },
    getAllByCertId: async (req, res) => {
        const { certId } = req.params;
        const result = await new CertTypeService({}).getAllByCertId(certId);
        responseSender(res, result);
    },
    getAllByCityId: async (req, res) => {
        const { cityId } = req.params;
        const result = await new CertTypeService({}).getAllByCityId(cityId);
        responseSender(res, result);
    },
    getAllByCityAndCertIds: async (req,res) =>{
        const {certId,cityId} = req.params;
        const result = await new CertTypeService({}).getAllByCertIdAndCityId(certId,cityId);
        responseSender(res,result);
    }
};