const router = require("express").Router();
const controller = require("../controllers/admin");
const { verifyToken, verifyAdminToken } = require("../middleware/auth");
const apiHandler = require("../helpers/wrappers/api-handler");


router.post("/", apiHandler(controller.add));
router.post("/login", apiHandler(controller.login));
router.post("/year", apiHandler(verifyAdminToken), apiHandler(controller.createYear));

router.put("/", apiHandler(verifyAdminToken), apiHandler(controller.update));

router.get("/cities", apiHandler(controller.getCities));
router.get("/years", apiHandler(controller.getYears));

module.exports = router;
