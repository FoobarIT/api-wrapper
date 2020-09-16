import promise from 'promise';
export class UserModel {
    reqRegister(req, res, new_users) {
        db.query('INSERT INTO users SET ?', [new_users], function(err) {
            if (err) {
                res.render('signup.ejs');
            } else {
                res.redirect('/login')
            }
        })
    }
    async reqLogin(req, res, new_login) {
        let promiseMatch = new promise(function(resolve, reject) {
            db.query('SELECT `id`, `name`, `email`, `password`, `mode` FROM users WHERE email = ? ', [new_login.email], (err, result) =>  {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
        return promiseMatch.then((result) => result)
    }
}