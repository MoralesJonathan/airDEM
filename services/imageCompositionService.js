const Jimp = require("jimp");
imageCompositingService = {
    compositeImage: (data, cb) => {
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
            Promise.all([dateFontPromise, priceFontPromise, buttonfontPromise, routefontPromise,timestampfontPromise]).then(fonts => {
                results[1]
                    .composite(results[0], 0, 0)
                    .print(fonts[3], 20, 175, data.route)
                    .print(fonts[0], 20, 215, `Leaving ${data.departureDate}`)
                    .print(fonts[0], 175, 300, `Each way / ${data.fareClass}`)
                    .print(fonts[1], 240, 260, `$${data.price}`)
                    .print(fonts[2], 125, 370, "BUY NOW")
                    .print(fonts[4], 100, 400, `Prices updated ${data.searchDate}`)
                    .quality(100)
                    .getBuffer(Jimp.MIME_JPEG, (e, imageBuffer) => {
                        cb(imageBuffer);
                    });
            });
        });
    }
}

module.exports = imageCompositingService;