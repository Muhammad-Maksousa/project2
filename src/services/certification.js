const Certification = require("../models/certification");

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
        return await Certification.findAll({ attributes: ['id', 'name'] });
    }

}
module.exports = CertificationService;
