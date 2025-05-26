const Certification = require("../models/certification");
const CertType = require("../models/certType");
const City = require("../models/city");

class CertTypeService {
    constructor({ name, certId, cityId }) {
        this.name = name;
        this.certId = certId;
        this.cityId = cityId;
    }
    async add() {
        return await CertType.create({
            name: this.name,
            certId: this.certId,
            cityId: this.cityId
        });
    }
    async update(id) {
        return await CertType.update({
            name: this.name,
            certId: this.certId,
            cityId: this.cityId
        }, { where: { id: id } });
    }
    async getAll() {
        return await CertType.findAll({
            attributes: ['id', 'name', 'cityId', 'certId'],
            include: [{ model: City, attributes: ['name'] }, { model: Certification, attributes: ['name'] }]
        });
    }
    async getAllByCertId(certId) {
        return await CertType.findAll({
            where: { certId: certId },
            attributes: ['id', 'name', 'cityId', 'certId'],
            include: [{ model: City, attributes: ['name'] }, { model: Certification, attributes: ['name'] }]
        });
    }
    async getAllByCityId(cityId) {
        return await CertType.findAll({
            where: { cityId: cityId },
            attributes: ['id', 'name', 'cityId', 'certId'],
            include: [{ model: City, attributes: ['name'] }, { model: Certification, attributes: ['name'] }]
        });
    }
    async getAllByCertIdAndCityId(certId, cityId) {
        return await CertType.findAll({
            where: { certId: certId, cityId: cityId },
            attributes: ['id', 'name', 'cityId', 'certId'],
            include: [{ model: City, attributes: ['name'] }, { model: Certification, attributes: ['name'] }]
        });
    }
}
module.exports = CertTypeService;
