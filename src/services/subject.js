const CertType = require("../models/certType");
const Subject = require("../models/subject");

class SubjectService {
    constructor({ name, maxMark, minMark, certTypeId }) {
        this.name = name;
        this.maxMark = maxMark;
        this.minMark = minMark;
        this.certTypeId = certTypeId;
    }
    async add() {
        return await Subject.create({
            name: this.name,
            maxMark: this.maxMark,
            minMark: this.minMark,
            certTypeId: this.certTypeId
        });
    }
    async update(id) {
        return await Subject.update({
            name: this.name,
            maxMark: this.maxMark,
            minMark: this.minMark,
            certTypeId: this.certTypeId
        }, { where: { id: id } });
    }
    
    async getAll() {
        return await Subject.findAll({
            attributes: ['id', 'name', 'minMark', 'maxMark', 'certTypeId'],
            include: { model: CertType, attributes: ['name'] }
        });
    }

    async getAllByCertTypeId(certTypeId) {
        return await Subject.findAll({
            where: { certTypeId: certTypeId },
            attributes: ['id', 'name', 'minMark', 'maxMark', 'certTypeId'],
            include: { model: CertType, attributes: ['name'] }
        });
    }

}
module.exports = SubjectService;
