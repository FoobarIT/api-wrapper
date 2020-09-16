import multer from 'multer'

export class UploadMiddleware {

    static filename = null
    static getFilename() {
        return UploadMiddleware.filename;
    }

    static imgUUID(n) {
        let range = '0123456789'
        let token = ''
        for (let i = 0; i < n; i++) {
            token += range[Math.floor(Math.random() * range.length)];
        }
        return token
    }

    static upload(directory) {
        let storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/' + directory)
            },
            /**
             *   @return {void}
             *   TODO: Ajouté une condition pour vérifier que le nom de l'image n'existe pas déjà.
             */
            filename(req, file, callback) {
                console.log(file)
                UploadMiddleware.filename = UploadMiddleware.imgUUID(6)+ '.' + file.mimetype.split('/')[1]
                callback(null, UploadMiddleware.filename)

            }
        });

        let fileFilter = function (req, file, cb) {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
                cb(null, true)
            } else {
                cb(null, false)
            }
        }
        return multer({storage, fileFilter});
    }
}