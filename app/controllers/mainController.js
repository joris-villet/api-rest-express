


module.exports = {

    homePage: (req, res, next) => {
        res.render('index', {
            title: "Page d'accueil",
            session: req.session.admin
        })
    },

    register: (req, res, next) => {
        res.render('register', {
            title: "inscription"
        })
    },

    notFound: (req, res, next) => {
        res.json("Page non trouvée")
    }

}