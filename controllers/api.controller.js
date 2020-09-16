import {ApiModel} from "../models/api.model.js";

export class ApiController {

    static async allCharacters(req, res) {
        res.json({
            message: "Authorization Success | API Silicon Valley v0.0.1",
            game_menu: await ApiModel.getCharactersList()
        })
    }

}