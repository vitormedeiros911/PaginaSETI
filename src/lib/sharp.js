const sharp = require("sharp")

module.exports = {
    resizeImage(file) {
        try {
            let resizedImage = `public/images/tutoriais/resized-${file.filename}`

            sharp(file.path)
                .resize(600, 500, {
                    fit: "fill",
                    quality: 90,
                })
                .toFile(resizedImage)
            
            return file.path = resizedImage

        } catch (error) {
            console.error(error);
        }
    }
}