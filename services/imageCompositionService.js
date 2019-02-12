const Jimp = require("jimp");
imageCompositingService = {
    compositeImage: (data) => {
        return new Promise((resolve, reject) => {
            let cardHeaderPromise = new Promise((resolve, reject) => {
                Jimp.read(data.destinationCityImage)
                    .then(headerImage => {
                        resolve(headerImage
                            .cover(350, 145, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_CENTER)
                            .quality(100));
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
            let baseImagePromise = new Promise((resolve, reject) => {
                Jimp.read('cardTemplate/350x450.png').then(baseImage => {
                    resolve(baseImage)
                }).catch(ERR => {
                    reject(err)
                });
            })
        Promise.all([cardHeaderPromise, baseImagePromise]).then(results => {
                const dateFontPromise = new Promise((resolve, reject) => {
                    Jimp.loadFont('cardTemplate/dateFont.fnt', function (err, datefont) {
                        !err ? resolve(datefont) : reject(err)
                    });
                })
                const priceFontPromise = new Promise((resolve, reject) => {
                    Jimp.loadFont('cardTemplate/priceFont.fnt', function (err, priceFont) {
                        !err ? resolve(priceFont) : reject(err)
                    });
                })
                const buttonfontPromise = new Promise((resolve, reject) => {
                    Jimp.loadFont('cardTemplate/buttonFont.fnt', function (err, buttonfont) {
                        !err ? resolve(buttonfont) : reject(err)
                    });
                })
                const timestampfontPromise = new Promise((resolve, reject) => {
                    Jimp.loadFont('cardTemplate/updatedTimeFont.fnt', function (err, timestampfont) {
                        !err ? resolve(timestampfont) : reject(err)
                    });
                })
                const routefontPromise = new Promise((resolve, reject) => {
                    if (data.route.length > 34) {
                        Jimp.loadFont('cardTemplate/routeFontSmaller.fnt', function (err, routefont) {
                            !err ? resolve(routefont) : reject(err)
                        });
                    } else {
                        Jimp.loadFont('cardTemplate/routeFont.fnt', function (err, routefont) {
                            !err ? resolve(routefont) : reject(err)
                        });
                    }
                })
                Promise.all([dateFontPromise, priceFontPromise, buttonfontPromise, routefontPromise, timestampfontPromise]).then(fonts => {
                    results[1]
                        .composite(results[0], 0, 0)
                        .print(fonts[3], 20, 175, data.route)
                        .print(fonts[0], 20, 215, `Leaving ${data.departureDate}`)
                        .print(fonts[0], 200, 300, { text: `Each way / ${data.fareClass}`, alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP })
                        .print(fonts[1], 240, 260, { text: `$${data.price}`, alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT, alignmentY: Jimp.VERTICAL_ALIGN_TOP })   
                        .print(fonts[2], 125, 365, "BUY NOW")
                        .print(fonts[4], 15, 430, `Prices updated ${new Date(data.searchDate).toLocaleString()}`)
                        .quality(100)
                        .getBuffer(Jimp.MIME_JPEG, (e, imageBuffer) => {
                            resolve(imageBuffer);
                        });
                });
            })
        });
    }

}

module.exports = imageCompositingService;