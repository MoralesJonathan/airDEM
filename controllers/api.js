const express = require("express"),
    router = express.Router();

const campaigns = require("../models/campaigns.js");
router.get("/campaign", (req,res) => {
    campaigns.test((status,message = "ok") => res.status(status).send(message));
});

router.get("/campaigns", (req,res) => {
    campaigns.test((status,message = "ok") => res.status(status).send(message));
});

router.post("/campaign", (req,res) => {
    campaigns.test((status,message = "ok") => res.status(status).send(message));
});

router.delete("/campaign", (req,res) => {
    campaigns.test((status,message = "ok") => res.status(status).send(message));
});

module.exports = router;