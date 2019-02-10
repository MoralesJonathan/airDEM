const axios = require('axios');
process.env.NODE_ENV === "production" ? null : require("dotenv").config()
imageGenerationService = {
    getFlightInfo: (index, airline, campaignId) => {
        return axios.post(`${process.env.FARES_API}${airline}/fares/grouped-routes`, {"flightType":"ONE_WAY","travelClasses":["ECONOMY"],"priceFormat":{"decimalSeparator":"","thousandSeparator":"","decimalPlaces":0},"datePattern":"MM/dd/yyyy","languageCode":"en","outputCurrencies":["USD"],"routesLimit":11,"faresPerRoute":1,"dataExpirationWindow":"1d","outputFields":["returnDate","usdTotalPrice","popularity","originCity","destinationCity","destinationAirportImage","destinationCityImage","destinationStateImage","destinationCountryImage","destinationRegionImage","farenetTravelClass","travelClass","flightDeltaDays"],"sorting":[{"popularity":"DESC"},{"usdTotalPrice":"ASC"}],"departure":{"start":"2019-02-10","end":"2019-05-11"},"origins":[],"destinations":[]}, {
            headers: {
                "Authorization": `${process.env.FARES_TOKEN}`
            },
            dataType: "json",
            contentType: "application/json;charset=UTF-8"
        })
    }
}

module.exports = imageGenerationService;