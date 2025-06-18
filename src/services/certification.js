const Certification = require("../models/certification");
const CertType = require("../models/certType");
const City = require("../models/city");
const Subject = require("../models/subject");

class CertificationService {
    constructor({ name }) {
        this.name = name;
    }
    async add() {
        return await Certification.create({
            name: this.name
        });
    }
    async update(id) {
        return await Certification.update({
            name: this.name
        }, { where: { id: id } });
    }
    async getAll() {
        return await Certification.findAll({
            attributes: ['id', 'name'],
            include: [{
                model: CertType, attributes: ['id', 'name'],
                include: [
                    { model: City, attributes: ['id', 'name'] },
                    { model: Subject, attributes: ['id', 'name', 'minMark', 'maxMark'] }
                ]
            }]

        });
    }

}
module.exports = CertificationService;
