const router = require("express").Router();
const controller = require("../controllers/certificationType");
const { verifyToken, verifyAdminToken } = require("../middleware/auth");
const apiHandler = require("../helpers/wrappers/api-handler");


router.post("/", apiHandler(verifyAdminToken), apiHandler(controller.create));

router.put("/", apiHandler(verifyAdminToken), apiHandler(controller.update));

router.get("/", apiHandler(verifyToken), apiHandler(controller.getAll));
router.get("/cert/:certId", apiHandler(verifyToken), apiHandler(controller.getAllByCertId));
router.get("/city/:cityId", apiHandler(verifyToken), apiHandler(controller.getAllByCityId));
router.get("/cAndc/:certId/:cityId", apiHandler(verifyToken), apiHandler(controller.getAllByCityAndCertIds));

module.exports = router;
