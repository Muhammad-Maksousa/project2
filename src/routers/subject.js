const router = require("express").Router();
const controller = require("../controllers/subject");
const { verifyToken, verifyAdminToken } = require("../middleware/auth");
const apiHandler = require("../helpers/wrappers/api-handler");


router.post("/", apiHandler(verifyAdminToken), apiHandler(controller.create));

router.put("/", apiHandler(verifyAdminToken), apiHandler(controller.update));

router.get("/", apiHandler(verifyToken), apiHandler(controller.getAll));
router.get("/certType/:certTypeId", apiHandler(verifyToken), apiHandler(controller.getAllByCertTypeId));

module.exports = router;
