export class AdminModel {
    static postNewCharacter(req, res, new_character) {
        db.query('INSERT INTO characters SET ?', [new_character], function(err, result) {
            if (err) {
                throw err
            } else {
                console.log(result)
            }
        })
    }
}

