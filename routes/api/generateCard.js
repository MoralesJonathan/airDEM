const router = require('express').Router();
const imageGeneration = require("../../services/imageGenerationService");
   

router.get("/:index/:airline/:lookahead1-:lookahead2/:campaignId", (req, res) => {
    let {index, airline, campaignId, lookahead1,lookahead2} = req.params;
    imageGeneration.retrieveImages(index, airline, [lookahead1, lookahead2], campaignId).then(image =>{
        res.writeHead(200, {
            'Content-Type': 'image/jpg',
            'Content-Length': image.length
          });
          res.end(image); 
          tracking.logViewTracking({"campaign":campaignId})
    })
})


module.exports = router;

