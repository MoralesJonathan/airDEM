
import axios from "axios";

export default {
    // Gets all Campaigns
    getCampaigns: function(iata) {
        return axios.get(`/api/campaigns/${iata}`);
    },
    // Gets the Campgain with the given id
    getCampaign: function(id,iata) {
        return axios.get(`/api/campaign/${iata}/${  id}`);
    },
    // Deletes the Campaign with the given id
    deleteCampaign: function(id,iata) {
        return axios.delete(`/api/campaign/${iata},${  id}`);
    },
    // Saves a Campaign to the database
    saveCampaign: function(campaignData) {
        return axios.put("/api/campaign", campaignData);
    },
    // Updates a Campaign in the database
    updateCampaign: function(campaignData) {
        return axios.post("/api/campaign", campaignData);
    },
    // Gets all Customer
    getCustomers: function(iata) {
        return axios.get(`/api/customers/${iata}`);
    },
    // Gets the Customer with the given id
    getCustomer: function(id) {
        return axios.get(`/api/customer/${  id}`);
    },
    // Deletes the Customer with the given id
    deleteCustomer: function(id) {
        return axios.delete(`/api/customer/${  id}`);
    },
    // Saves a Customer to the database
    saveCustomer: function(customerData) {
        return axios.put("/api/customer", customerData);
    },
    // Updates a Customer in the database
    updateCustomer: function(customerData) {
        return axios.post("/api/customer", customerData);
    },
    // Updates a Customer in the database
    getAirlineSettings: function(airline) {
        return axios.get(`/api/airline/${airline}`);
    },
    // Updates a Customer in the database
    getAirlines: function() {
        return axios.get("/api/airlines");
    },
    // Updates a Customer in the database
    updateAirlineSettings: function(airlineSettings) {
        return axios.put("/api/airline", airlineSettings);
    },
    // Gets the tracking data per campaign
    getStats: function(airline){
        return axios.get(`/api/tracking/${airline}`)
    },
    getTemplate: function(template){
        return axios.get(`/api/template/${template}`);
    }
};