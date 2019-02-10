
import axios from "axios";

export default {
  // Gets all Campaigns
  getCampaigns: function() {
    return axios.get("/api/campaigns");
  },
  // Gets the Campgain with the given id
  getCampaign: function(id) {
    return axios.get("/api/campaign/" + id);
  },
  // Deletes the Campaign with the given id
  deleteCampaign: function(id) {
    return axios.delete("/api/campaign/" + id);
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
   getCustomers: function() {
    return axios.get("/api/customers");
  },
  // Gets the Customer with the given id
  getCustomer: function(id) {
    return axios.get("/api/customer/" + id);
  },
  // Deletes the Customer with the given id
  deleteCustomer: function(id) {
    return axios.delete("/api/customer/" + id);
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
  getAirlineSettings: function() {
    return axios.get("/api/airlineSettings");
  },
  // Updates a Customer in the database
  updateAirlineSettings: function(airlineSettings) {
    return axios.post("/api/airlineSettings", airlineSettings);
  }

};