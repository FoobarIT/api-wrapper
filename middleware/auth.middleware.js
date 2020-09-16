export class AuthMiddleware {
    static LoggedIn(req, res, next) {
        if (req.session.user === null || req.session.user === undefined) {
            return res.redirect('/login')
        }
        next()
    }
    static isMember(req, res, next) {
        if (req.session.user.mode >= 1) {
            next()
        } else {
            return res.redirect('/dashboard')
        }
    }
    static isAdmin(req, res, next) {
        if (req.session.user.mode >= 2) {
            next()
        } else {
            return res.redirect('/dashboard')
        }
    }
}