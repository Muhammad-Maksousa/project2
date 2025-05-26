const router = require("express").Router();
const controller = require("../controllers/student");
const { verifyToken, verifyAdminToken } = require("../middleware/auth");
const apiHandler = require("../helpers/wrappers/api-handler");


router.post("/", apiHandler(verifyToken), apiHandler(controller.create));

router.put("/", apiHandler(verifyToken), apiHandler(controller.update));
router.put("/mark", apiHandler(verifyToken), apiHandler(controller.updateMark));

router.get("/", apiHandler(verifyToken), apiHandler(controller.getAll));
router.get("/:eYearId/:certTypeId/:number", apiHandler(controller.getOne));


router.delete("/:studentId", apiHandler(verifyToken), apiHandler(controller.delete));

module.exports = router;
