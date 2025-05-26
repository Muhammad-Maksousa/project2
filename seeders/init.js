const sequelize = require("../src/helpers/db/init");
const models = require("../src/models");
const data = require("./data.json");

sequelize.sync({ alter: true }).then(async () => {
    console.log("seed started");
    for (model in models) {
        for (key in data) {
            if (key === model.toString()) {
                console.log(`Seeding ${key}s`);
                let start = Date.now();
                await models[model].bulkCreate(data[key]);
                console.log(`took to seed ${key}s: ${Date.now() - start}`);
            }
        }
    }
});
