const router = require("express").Router();
const controller = require("../controllers/dataEntry");
const { verifyToken, verifyAdminToken } = require("../middleware/auth");
const apiHandler = require("../helpers/wrappers/api-handler");


router.post("/", apiHandler(verifyAdminToken), apiHandler(controller.create));
router.post("/login", apiHandler(controller.login));

router.put("/", apiHandler(verifyAdminToken), apiHandler(controller.update));

router.get("/", apiHandler(verifyAdminToken), apiHandler(controller.getAll));
router.get("/one/:id", apiHandler(verifyToken), apiHandler(controller.getOne));
router.get("/block/:id", apiHandler(verifyAdminToken), apiHandler(controller.block));
router.get("/unBlock/:id", apiHandler(verifyAdminToken), apiHandler(controller.unBlock));

module.exports = router;
