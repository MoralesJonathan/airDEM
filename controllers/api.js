const express = require("express"),
    router = express.Router();

const campaigns = require("../models/campaigns.js");
router.get("/campaign/:id", (req, res) => {
    campaigns.getCampaign(req.params.id, (status, data = "ok") => res.status(status).send(data));
});

router.get("/campaigns", (req, res) => {
    campaigns.getAllCampaigns((status, data = "ok") => res.status(status).send(data));
});

router.post("/campaign", (req, res) => {
    campaigns.createCampaign(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.delete("/campaign/:id", (req, res) => {
    campaigns.deleteCampaign(req.params.id, (status, data = "ok") => res.status(status).send(data));
});

router.get("/campaignsTest", (req, res) => {
    campaigns.test((status, message = "ok") => res.status(status).send(message));
});

module.exports = router;