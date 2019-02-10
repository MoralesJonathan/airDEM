
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
    return axios.get("/api/airlines");
  },
  // Updates a Customer in the database
  updateAirlineSettings: function(airlineSettings) {
    return axios.put("/api/airline", airlineSettings);
  },
  // Gets the tracking data per campaign
  getStats: function(){
    return new Promise((resolve, reject) =>{
      resolve({
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
      });
    });
  }

};