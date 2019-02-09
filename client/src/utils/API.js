
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
  saveCampaign: function(bookData) {
    return axios.post("/api/campaign", bookData);
  }
};