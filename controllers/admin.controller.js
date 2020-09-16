import {UploadMiddleware} from "../middleware/upload.middleware.js";
import {AdminModel} from "../models/admin.model.js";

export class AdminController {

    static goAddCharacter(req, res) {
        let user_infos = req.session.user
        return res.render('./dashboard/gestion.add-character.ejs', {user_infos: user_infos})
    }

    static addCharacter(req, res) {
        let body = req.body;
        let new_character = {
            'name': body.name,
            'gender': body.gender,
            'age': body.age,
            'hair_color': body.hair_color,
            'birthday': body.birthday,
            'status': body.status,
            'marital_status': body.marital_status,
            'occupation': body.occupation,
            'adress': body.adress,
            'strengths': body.strengths,
            'season': body.season,
            'first_episode': body.first_episode,
            'last_episode': body.last_episode,
            'portrayer': body.portrayer,
            'img': "http://localhost:8080/img/img-character/" + UploadMiddleware.getFilename()
        }
        AdminModel.postNewCharacter(req, res, new_character)
        return res.redirect('/gestion/add-character')
    }
}
