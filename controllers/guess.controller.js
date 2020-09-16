export class GuessController {
    static getHome(req, res) {
        return res.render('home.ejs')
    }
    static getLogin(req, res) {
        return res.render('signin.ejs')
    }
    static getRegister(req, res) {
        return res.render('signup.ejs')
    }
}