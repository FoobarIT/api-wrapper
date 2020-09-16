import promise from 'promise'
export class ApiModel {

    static async getCharactersList() {
        let promiseCharactersList = new promise(function(resolve, reject) {
            let characters_list = 'SELECT * FROM characters ORDER BY id';
            let params = []
            db.query(characters_list, params, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
        return promiseCharactersList.then((result) => result)
    }
}