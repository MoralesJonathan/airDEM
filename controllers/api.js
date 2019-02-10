const express = require("express"),
    router = express.Router();

const campaigns = require("../models/campaigns.js"),
    customers = require("../models/customers.js"),
    airlines = require("../models/airlines.js");
    
router.get("/campaign/:id", (req, res) => {
    campaigns.getCampaign(req.params.id, (status, data = "ok") => res.status(status).send(data));
});

router.get("/campaigns", (req, res) => {
    campaigns.getAllCampaigns((status, data = "ok") => res.status(status).send(data));
});

router.put("/campaign", (req, res) => {
    campaigns.createCampaign(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/campaign", (req, res) => {
    campaigns.updateCampaign(req.body, (status, message = "ok") => res.status(status).send(message));
});

router.delete("/campaign/:id", (req, res) => {
    campaigns.deleteCampaign(req.params.id, (status, data = "ok") => res.status(status).send(data));
});

router.get("/campaignsTest", (req, res) => {
    campaigns.test((status, message = "ok") => res.status(status).send(message));
});

router.get("/customer/:id", (req, res) => {
    customers.getCustomer(req.params.id, (status, data = "ok") => res.status(status).send(data));
});

router.get("/customers", (req, res) => {
    customers.getAllCustomers((status, data = "ok") => res.status(status).send(data));
});

router.put("/customer", (req, res) => {
    customers.createCustomer(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/customer", (req, res) => {
    customers.updateCustomer(req.body, (status, message = "ok") => res.status(status).send(message));
});

router.delete("/customer/:id", (req, res) => {
    customers.deleteCustomer(req.params.id, (status, data = "ok") => res.status(status).send(data));
});

router.get("/customersTest", (req, res) => {
    customers.test((status, message = "ok") => res.status(status).send(message));
});

router.get("/airline/:id", (req, res) => {
    airlines.getAirline(req.params.id, (status, data = "ok") => res.status(status).send(data));
});

router.get("/airlines", (req, res) => {
    airlines.getAllAirlines((status, data = "ok") => res.status(status).send(data));
});

router.put("/airline", (req, res) => {
    airlines.createAirline(req.body,(status, data = "ok") => res.status(status).send(data));
});

router.post("/airline", (req, res) => {
    airlines.updateAirline(req.body, (status, message = "ok") => res.status(status).send(message));
});

router.delete("/airline/:id", (req, res) => {
    airlines.deleteAirline(req.params.id, (status, data = "ok") => res.status(status).send(data));
});

router.get("/airlinesTest", (req, res) => {
    airlines.test((status, message = "ok") => res.status(status).send(message));
});

module.exports = router;

