import {UserModel} from "../models/user.model.js";
import bcrypt from 'bcrypt'
const saltRounds = 10;

export class UserController {
    static userModel = new UserModel()

    static async postRegister(req, res) {
        let body = req.body;
        const password = body.password;
        const encryptedPassword = await bcrypt.hash(password, saltRounds)
            let new_users = {
                'email':body.email,
                'name': body.name,
                'password': encryptedPassword,
                'mode': 0,
                'created_at': new Date()
            };
        UserController.userModel.reqRegister(req, res, new_users)
    }
    static async postLogin(req, res) {
        let body = req.body;
            let new_login = {
                email:body.email,
                pass:body.password
            }
        let match_account = await UserController.userModel.reqLogin(req, res, new_login);
            if (match_account.length > 0) {
                bcrypt.compare(new_login.pass, match_account[0].password, function(err, result) {
                    if (result) {
                        req.session.user = {
                            id: match_account[0].id ,
                            name: match_account[0].name,
                            email: match_account[0].email,
                            mode: match_account[0].mode
                        }
                        res.redirect('/dashboard')
                    } else {
                        res.render('signin.ejs');
                    }
                })
            } else {
                res.render('signin.ejs')
            }
    }
    static userLogout(req, res) {
        req.session.destroy(function (err) {
            if (err) {
                throw err;
            } else {
                res.redirect('/')
            }
        })
    }
    static goDashboard(req, res) {
        let user_infos = req.session.user
        console.log(user_infos)
        return res.render('./dashboard/dashboard.ejs', {user_infos: user_infos})
    }
    static goDocumentation(req, res) {
        let user_infos = req.session.user
        return res.render('./dashboard/documentation.ejs', {user_infos: user_infos})
    }
    static goSupport(req, res) {
        let user_infos = req.session.user
        return res.render('./dashboard/support.ejs', {user_infos: user_infos})
    }
}

