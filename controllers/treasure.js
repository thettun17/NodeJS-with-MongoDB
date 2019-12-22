const Treasure = require('../models/treasureSchema');
const Money = require('../models/moneyvalue');
exports.create = (req, res, next) => {
    if(req.session.isLoggedIn) {
        res.render('treasure/create', {
            path: '/',
            pageTitle: 'LuckyShine',
            isAuthenticated: req.session.isLoggedIn
        });
    } else {
        return res.redirect('/login');
    }
};

exports.index = (req, res, next) => {
    const lat2 = req.body.latitude;
    const lon2 = req.body.longitude;
    Treasure.find()
    .then( results => {
        results.forEach( result => {
            console.log(result.latitude);
            var radlat1 = Math.PI * result.latitude/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = result.longitude-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            dist = Math.floor(dist * 1.609344);
            console.log(dist);
            if(dist >=1 && dist <= 10) {
                
                Money.find({treasureid: result._id})
                .populate('treasureid')
                .then( amount => {
                    return res.render('treasure/index', {
                        path: '/',
                        pageTitle: 'LuckyShine',
                        game: 'true',
                        isAuthenticated: req.session.isLoggedIn
                    });
                })
                .catch(err => {
                    console.log(err);
                });
                
            }
        });
        return res.render('treasure/index', {
            path: '/1',
            pageTitle: 'LuckyShine',
            game: '',
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.terasureCreate = (req, res, next) => {
    const treasure = new Treasure({
        latitude: 100.125,
        longitude: 12.2235,
        name: "Third pirze"
    }).save()
    .then( result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
};


exports.createmoney = (req, res, next) => {
    const money = new Money({
        treasureid: "5dffe2f67efd1655b8ff2805",
        amt: 30
        
    }).save()
    .then( result => {
        console.log(result);
    })
    .catch( err => {
        console.log(err);
    });
};