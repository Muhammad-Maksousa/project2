const router = require("express").Router();

router.use("/admin", require("./admin"));
router.use("/cert", require("./cert"));
router.use("/certType", require("./certType"));
router.use("/subject", require("./subject"));
router.use("/dataEntry", require("./dataEntry"));
router.use("/student", require("./student"));



//should be in the end of all routers
router.use('*', (req, res) => {
    res.status(404).json({ message: 'The Page Not Found', httpStatusCode: 404 })
});
module.exports = router;
