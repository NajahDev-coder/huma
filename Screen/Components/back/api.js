require("dotenv").config();
var express = require("express");

const multer = require('multer')

const sharp = require('sharp');
const path = require('path')
const cors = require("cors");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const bodyParser = require('body-parser');

var router = express.Router();
var request = require("request").defaults({ encoding: null });
var fs = require("fs");
var mysqlModel = require('../mysql-model');
//var { db } = require("./config");
//var mysqlModel = require('mysql-model');
var dirIMages = '/home/yacfsbjb/public_html/images';
const db = mysqlModel.createConnection({
    host: 'localhost',
    user: 'yacfsbjb_huma',
    password: 'i/33m39Z3E3=qZm&ZZ',
    database: 'yacfsbjb_huma',
    port: 3306,
    //socketPath: '/var/run/mysqld/mysqld.sock',
    charset: 'utf8',
    multipleStatements: true,
    connectTimeout: 15000,
    acquireTimeout: 10000,
    waitForConnections: true,
    connectionLimit: 1000,
    queueLimit: 5000,
    debug: false
});


var Users = db.extend({
    tableName: "users",
});
var Categories = db.extend({
    tableName: "categories",
});
var Annonces = db.extend({
    tableName: "annonces",
});

var Types = db.extend({
    tableName: "types",
});
var Offres = db.extend({
    tableName: "offres",
});


var Amis = db.extend({
    tableName: "amis",
});

var Session = db.extend({
    tableName: "session",
});

var Messages = db.extend({
    tableName: "messages",
});

var Avis = db.extend({
    tableName: "avis",
});
var Publicites = db.extend({
    tableName: "publicites",
});
var Users_File = db.extend({
    tableName: "users_file",
});
var Notifications = db.extend({
    tableName: "notifications",
})
var Historique = db.extend({
    tableName: "historique",
})
var historique = new Historique();
var user = new Users();
var annonces = new Annonces();
var offres = new Offres();
var categories = new Categories();
var types = new Types();
var amis = new Amis();
var session = new Session();

var messages = new Messages();
var avis = new Avis();
var publicites = new Publicites();

var users_file = new Users_File();
var notifications = new Notifications();

/* List of API */
router.get("/", function (req, res, next) {
    console.log(process.env.NODE_ENV)
    res.render("list", {
        title: "HüMA",
        apilist: [
            {
                name: `${req.headers.host}/api/user`,
                description: "All User Listing",
                method: "get",
            },
            {
                name: `${req.headers.host}/api/user/register`,
                description: "New User Register",
                method: "post",
            },
            {
                name: `${req.headers.host}/api/user/login`,
                description: "User Authentication",
                method: "post",
            },
            {
                name: `${req.headers.host}/api/user/search`,
                description: "User Search",
                method: "get",
            },
            {
                name: `${req.headers.host}/api/types`,
                description: "Types",
                method: "get",
            },
            {
                name: `${req.headers.host}/api/categories`,
                description: "Categories",
                method: "get",
            },
            {
                name: `${req.headers.host}/api/categories/:parent`,
                description: "Sous Categories",
                method: "get",
            },
            {
                name: `${req.headers.host}/api/annonce/create`,
                description: "Create Annonce",
                method: "post",
            },
            {
                name: `${req.headers.host}/api/publicite/create`,
                description: "Create publicite",
                method: "post",
            },
            {
                name: `${req.headers.host}/api/annonces/:filter`,
                description: "List Annonce",
                method: "get",
            },

            {
                name: `${req.headers.host}/api/mesannonces/:id_user/:filter`,
                description: "List Annonce for user",
                method: "get",
            },
            {
                name: `${req.headers.host}/api/mesfavannonces/:id_user`,
                description: "List Annonce favoris for user",
                method: "get",
            },
            {
                name: `${req.headers.host}/api/mesmessages/:id_user`,
                description: "List messages for user",
                method: "get",
            },
            {
                name: `${req.headers.host}/api/addfavannonces/:id_user/:id_annonce`,
                description: "add Annonce favoris for user",
                method: "get",
            },
            {
                name: `${req.headers.host}/api/getfavannonces/:id_user/:id_annonce`,
                description: "get Annonce favoris for user",
                method: "get",
            },
            {
                name: `${req.headers.host}/api/delfavannonces/:id_user/:id_annonce`,
                description: "delete Annonce favoris for user",
                method: "get",
            },
            {
                name: `${req.headers.host}/api/annonce/:id_annonce`,
                description: "details Annonce",
                method: "get",
            },
            {
                name: `${req.headers.host}/api/offre/create`,
                description: "Ajouter offre pour Annonce",
                method: "post",
            },
            {
                name: `${req.headers.host}/api/offres/:id_annonce`,
                description: "liste des offres sur Annonce",
                method: "get",
            },
            {
                name: `${req.headers.host}/api/categorie/:id_annonce`,
                description: "recuperer la categorie d'une annonce",
                method: "get"
            },
            {
                name: `${req.headers.host}/api/type/:id_annonce`,
                description: "recuperer la categorie d'une annonce",
                method: "get"
            }, {
                name: `${req.headers.host}/api/upload_`,
                description: "upload image",
                method: "get"
            },
            {
                name: `${req.headers.host}/api/upload`,
                description: "upload image",
                method: "post"
            },
            {
                name: `${req.headers.host}/api/valid_offre/:id_offre`,
                description: "valider offre",
                method: "put"
            },

            {
                name: `${req.headers.host}/api/accept_offre/:id_offre`,
                description: "accept offre",
                method: "put"
            },
            {
                name: `${req.headers.host}/api/favoris_offre/:id_offre`,
                description: "add offre favoris",
                method: "put"
            },
            {
                name: `${req.headers.host}/api/session`,
                description: "creation session logué",
                method: "post"
            },
            {
                name: `${req.headers.host}/api/session/:user_id`,
                description: "get session logué",
                method: "get"
            },
            {
                name: `${req.headers.host}/api/getNotif/:user_id`,
                description: "get notification ",
                method: "get"
            },
            {
                name: `${req.headers.host}/api/getNotifMsg/:user_id`,
                description: "get notification msg non lu",
                method: "get"
            },
            {
                name: `${req.headers.host}/api/session`,
                description: "delete session logue",
                method: "delete"
            },
            {
                name: `${req.headers.host}/api/update_liste_amis`,
                description: "update liste amis",
                method: "post"
            },
            {
                //name:`${req.headers.host}/api/membres/:nom/:adresse/:type`,
                name: `${req.headers.host}/api/membres/:filter`,
                description: "get list of membres",
                method: "get"
            },

            {
                name: `${req.headers.host}/api/is_amis/:id_user1/:id_user2`,
                description: "check if  amis",
                method: "get"
            },
            {
                name: `${req.headers.host}/api/messages/:id_user1/:id_user2`,
                description: "get list message",
                method: "get"
            },
            {
                name: `${req.headers.host}/api/sent_messages`,
                description: "sent message",
                method: "post"
            },
            {
                name: `${req.headers.host}/api/marquerLuMessage/:id_user/:id_user2`,
                description: "marquer message lu",
                method: "put"
            },
            {
                name: `${req.headers.host}/api/marquerLuMessage/:id_user/:id_user2`,
                description: "marquer message lu",
                method: "put"
            },
            {
                name: `${req.headers.host}/api/isLuMessage/:id_user/:id_user2`,
                description: "if message lu",
                method: "get"
            },
            {
                name: `${req.headers.host}/api/updateNbreVueAnnc/:id_annonce`,
                description: "update nbre vue annonce",
                method: "get"
            },
            {
                name: `${req.headers.host}/api/updateNbreVisiteProfile/:id_user`,
                description: "update nbre visiteprofile annonce",
                method: "get"
            },
            {
                name: `${req.headers.host}/api/user/update`,
                description: "update donnes user",
                method: "post"
            },
            {
                name: `${req.headers.host}/api/user/updatePasw/:id_user/:password`,
                description: "update password user",
                method: "get"
            },
            {
                name: `${req.headers.host}/api/update_user_evaluation`,
                description: "update evaluation user",
                method: "post"
            },
            {
                name: `${req.headers.host}/api/user_evaluation/:id_user`,
                description: "get evaluation user",
                method: "get"
            },
            {
                name: `${req.headers.host}/api/user_rating/:id_user`,
                description: "get nbre etoile user",
                method: "get"
            },
            {
                name: `${req.headers.host}/api/updatetext_offre/:id_offre`,
                description: "upadate texte offre",
                method: "put"
            },
            {
                name: `${req.headers.host}/api/delete_offre/:id_offre`,
                description: "delete offre",
                method: "get"
            },
            {
                name: `${req.headers.host}/api/delete_annonce/:id_annonce`,
                description: "delete annonce",
                method: "get"
            }
        ],
    });
});
/* All types Listing */
router.get("/types", function (req, res, next) {

    var list_types = types.find('all', { group: ['id'], groupDESC: false }, function (rows, fields, err) {
        if (err) throw err;
        //res.send({ status: "success", data: rows, msg: "" });

        res.send(rows);
    });
});
/* All categories Listing */
router.get("/categories", function (req, res, next) {

    var list_categs = categories.find('all', { where: "parent = 0" }, function (rows, fields, err) {
        if (err) throw err;

        res.json(rows);
    });
});
router.get("/categories/:parent", function (req, res, next) {

    var list_categs = categories.find('all', { where: "parent = " + req.params.parent + "" }, function (rows, fields, err) {
        if (err) throw err;
        res.send({ status: "success", data: rows, msg: "" });
    });
});

router.get("/categorie/:id_annonce", function (req, res, next) {

    var list_categs = categories.find('first', { where: "id = '" + req.params.id_annonce + "'" }, function (rows, fields, err) {
        if (err) throw err;
        res.send({ status: "success", data: rows, msg: "" });
    });
});
router.get("/type/:id_annonce", function (req, res, next) {

    var list_categs = types.find('first', { where: "id = '" + req.params.id_annonce + "'" }, function (rows, fields, err) {
        if (err) throw err;
        res.send({ status: "success", data: rows, msg: "" });
    });
});
/* All User Listing */
router.get("/user", function (req, res, next) {
    var req_email = "nasri.najah@gmail.com";
    var req_password = "11223344";

    var list_users = user.find('first', { where: "email = '" + req_email + "' and password = '" + req_password + "'" }, function (rows, fields, err) {
        // var sql="SELECT * FROM users WHERE email = '" + req_email + "' and password = '" + req_password + "'";
        //db2.query(sql, (rows,err)=>{
        if (err) {
            console.log(err)
        }
        res.send({ status: "success", data: rows, msg: "" });
    });

});

/* New User Register */
router.post("/user/register", function (req, res, next) {
    try {
        var req_email = req.body.email;

        //let newUsers = user.find('first', { where: "email = '" + req.body.email + "' and password = '" + req.body.password + "'" }, function (rows,fields,err) {
        let newUsers = user.find('first', { where: "email = '" + req.body.email + "'" }, function (rows, fields, err) {

            if (err) {
                res.send({ status: "failed!" });
            }
            if (rows && rows.length > 0) {
                console.log("Email  Existe  Deja!", rows)
                res.send({ status: "Email  Existe  Deja!" });
            }
            else {

                user.query("INSERT INTO users (nom,email,age,tel,adresse,password,Userlongitude,Userlatitude) value ('" + req.body.nom + "','" + req.body.email + "','" + req.body.age + "','" + req.body.tel + "','" + req.body.adresse + "','" + req.body.password + "', '" + req.body.longitude + "', '" + req.body.latitude + "')", function (rows, fields, err) {
                    console.log("Inscription OK!!", user);
                    res.send({ status: "success" });
                });
            }


        });
    } catch (err) {
        next(err);
    }
});

/* User Authentication */
router.post("/user/login", function (req, res, next) {
    try {
        console.log("req.body -> ", req.body);

        let newUsers = user.find('first', { where: "email = '" + req.body.email + "' and password = '" + req.body.password + "'" }, function (rows, fields, err) {
            if (err) throw err;

            if (rows.length === 0) {
                console.log("Echec!")
                res.send({ status: "failed", data: {}, msg: "email et/ou password erroné!" });
            } else {
                console.log("login reussi!")
                res.send({ status: "success", data: rows, msg: "" });
            }
        });
    } catch (err) {
        next(err);
    }
});

/* User Search */
router.get("/user/search", function (req, res, next) {
    console.log("req.body -> ", req.query);
    const users = require("../users");
    console.log(users);
    let newUsers = users.filter(function (e) {
        return e.name && e.name.toLowerCase().includes(req.query.q.toLowerCase());
    });
    res.send({ status: "success", data: newUsers, msg: "" });
});
/* Create New Annonce */
router.post("/annonce/create", function (req, res, next) {

    try {

        annonces.query("INSERT INTO annonces ( user_id, titre, link_vedio,  court_description, description, auteur, adresse, latitude, longitude, type, categorie, propos_livraison, qty) value ('" + req.body.user_id + "', '" + req.body.titre + "', '" + req.body.linkVedio + "','" + req.body.court_description + "','" + req.body.description + "','" + req.body.auteur + "','" + req.body.adresse + "','" + req.body.latitude + "','" + req.body.longitude + "','" + req.body.type + "','" + req.body.categorie + "', '" + req.body.propos_livraison + "', '" + req.body.qty + "')", function (rows, fields, err) {

            console.log('Creation annonce OK!!', rows)
            if (err) throw err;
            res.send({ status: "success", msg: "Creation annonce OK!!", data: rows })
        });

    } catch (err) {
        next(err);
    }
});
/* update Annonce */
router.post("/annonce/update/:id_annonce", function (req, res, next) {

    try {

        annonces.query("update annonces set   titre='" + req.body.titre + "', link_vedio='" + req.body.linkVedio + "',  court_description='" + req.body.court_description + "', description='" + req.body.description + "', adresse='" + req.body.adresse + "', latitude='" + req.body.latitude + "', longitude='" + req.body.longitude + "', type='" + req.body.type + "', categorie='" + req.body.categorie + "', propos_livraison='" + req.body.propos_livraison + "', qty='" + req.body.qty + "' where id=" + req.params.id_annonce, function (rows, fields, err) {

            console.log('update annonce OK!!', rows)
            if (err) throw err;
            res.send({ status: "success", msg: "update annonce OK!!", data: rows })
        });

    } catch (err) {
        next(err);
    }
});
/* Create New Publicite */
router.post("/publicite/create", function (req, res, next) {

    try {

        publicites.query("INSERT INTO publicites (id_user, titre, lien) value ('" + req.body.id_user + "', '" + req.body.titre + "','" + req.body.lien + "')", function (rows, fields, err) {

            console.log('Creation publicite OK!!', rows)
            if (err) throw err;
            notifications.query("INSERT INTO notifications (id_activite, type_activite, id_user1, notification) VALUES ('', 'ajout_amis', '" + req.body.id_user + "',  'a ajouté une publicité!') ", function (rows, fields, err) {

                if (err) throw err;
                res.send({ status: "Creation publicites OK!!", data: rows })
            });
        });

    } catch (err) {
        next(err);
    }
});

/* All annonces Listing */
router.get("/annonces/:filter", function (req, res, next) {
    let filter = req.params.filter;
    filter = filter.replace('=', '');
    let dateB;
    let params = new URLSearchParams(JSON.parse(filter));
    let adresse = params.get("adresse");
    if (adresse) adresse = adresse.replace('+', ' ');
    let titre = params.get("titre");
    if (titre) titre = titre.replace('+', ' ');
    let type = params.get("type");
    let categorie = params.get("categorie");
    let dateS = params.get("dateStart");
    let dateF = params.get("dateEnd");
    if (dateS && dateF)
        dateB = "'" + dateS + "'  and '" + dateF + "'"
    let arrayFilter =
    {
        adresse: adresse,
        titre: titre,
        type: type,
        categorie: categorie,
        dateB: dateB

    }
    let where = '';
    if (typeof filter != undefined && filter.length > 0) {

        Object.keys(arrayFilter).map((key, index) => {
            if (key.length > 0 && arrayFilter[key] !== null && arrayFilter[key] != '' && arrayFilter[key] != undefined) {
                if (where.length > 0)
                    where += ' and  ';
                else
                    where = ' where ( ';
                if (key === 'adresse' || key === 'titre')
                    where += " A." + key + '  like "%' + arrayFilter[key] + '%" ';
                else if (key === 'dateB')
                    where += " (A.Date  Between " + arrayFilter[key] + ") ";
                else if (key === 'categorie')
                    where += "A.categorie In (SELECT id FROM `categories` where id=" + arrayFilter[key] + " or parent=" + arrayFilter[key] + " or parent IN (select id from categories where parent=" + arrayFilter[key] + "))";
                else
                    where += " A." + key + ' = ' + arrayFilter[key] + ' ';
            }
        })
        if (where.length > 0)
            where += ')'
    }
    var sql = "SELECT A.id as ID_ance ,A.adresse as Adresse_ance ,A.* , B.* FROM annonces as A left JOIN users as B on A.auteur=B.email " + where + " ORDER BY A.id DESC";
    var list_categs = annonces.query(sql, function (rows, fields, err) {
        if (err) throw err;

        res.send(rows);
        // res.send({sql,rows});
    });

});


/* All annonce Listing for user */
router.get("/mesannonces/:id_user/:filter", function (req, res, next) {
    let filter = req.params.filter;
    let id_user = req.params.id_user;
    filter = filter.replace('=', '');
    let dateB;
    let params = new URLSearchParams(JSON.parse(filter));
    let adresse = params.get("adresse");
    if (adresse) adresse = adresse.replace('+', ' ');
    let titre = params.get("titre");
    if (titre) titre = titre.replace('+', ' ');
    let type = params.get("type");
    let categorie = params.get("categorie");
    let dateS = params.get("dateStart");
    let dateF = params.get("dateEnd");
    if (dateS && dateF)
        dateB = "'" + dateS + "'  and '" + dateF + "'"
    let arrayFilter =
    {
        adresse: adresse,
        titre: titre,
        type: type,
        categorie: categorie,
        dateB: dateB

    }
    let where = " where ( B.id=" + id_user;
    if (typeof filter != undefined && filter.length > 0) {

        Object.keys(arrayFilter).map((key, index) => {
            if (key.length > 0 && arrayFilter[key] !== null && arrayFilter[key] != '' && arrayFilter[key] != undefined) {

                where += ' and  ';

                if (key === 'adresse' || key === 'titre')
                    where += " A." + key + '  like "%' + arrayFilter[key] + '%" ';
                else if (key === 'dateB')
                    where += " (A.Date  Between " + arrayFilter[key] + ") ";
                else if (key === 'categorie')
                    where += "A.categorie In (SELECT id FROM `categories` where id=" + arrayFilter[key] + " or parent=" + arrayFilter[key] + " or parent IN (select id from categories where parent=" + arrayFilter[key] + "))";
                else
                    where += " A." + key + " = " + arrayFilter[key] + " ";
            }
        })
        if (where.length > 0)
            where += ") "
    }
    var sql = "SELECT A.id as ID_ance ,A.adresse as Adresse_ance ,A.* , B.* FROM annonces as A left JOIN users as B on A.auteur=B.email " + where + " ORDER BY A.id DESC";
    var list_categs = annonces.query(sql, function (rows, fields, err) {
        if (err) throw err;

        res.send(rows);
        //res.send({ status: where, data: rows, msg: "" });
    });

});


/* All annonce Listing for user */
router.get("/mesfavannonces/:id_user", function (req, res, next) {

    let id_user = req.params.id_user;

    let where = " WHERE  C.id_user=" + id_user;


    //var list_categs = annonces.query("SELECT A.id as ID_ance ,A.adresse as Adresse_ance ,A.* , B.* FROM annonces as A left JOIN users as B on A.auteur=B.email "+where+" ORDER BY A.id DESC", function (rows,fields,err) {
    var list_categs = annonces.query("SELECT A.id as ID_ance ,A.adresse as Adresse_ance ,A.* , B.* FROM annonces as A left JOIN users as B ON A.auteur=B.email left JOIN annonce_favoris as C ON A.id=C.id_annonce  " + where + " ORDER BY A.id DESC", function (rows, fields, err) {
        if (err) throw err;

        res.send(rows);
        //res.send({ status: where, data: rows, msg: "" });
    });

});
/* All message Listing for user */
router.get("/mesmessages/:id_user", function (req, res, next) {

    let myidUser = req.params.id_user;

    let array_msg = [];

    let counter = 0;
    let message = {};

    renderMembreMessage(myidUser, function (listUSER) {

        renderMessage()



        function renderMessage() {

            if (counter < listUSER.length) {

                let amis = listUSER[counter];
                let idUSER = listUSER[counter]['id'];
                //var sql="select A.*, B.img_prof from messages as A left JOIN users as B on A.id_user1=B.id  where (A.id_user1="+myidUser+" and A.id_user2="+idUSER+") or (A.id_user2="+myidUser+" and A.id_user1="+idUSER+") ORDER by date DESC limit 1";

                let query2 = "select * from messages where (id_user1=" + myidUser + " and id_user2=" + idUSER + ") or (id_user2=" + myidUser + " and id_user1=" + idUSER + ") ORDER by date DESC limit 1";
                messages.query(query2, function (rows, fields, err) {
                    if (err) throw err;
                    message = {
                        amis,
                        message: rows[0]['message'],
                        lu: rows[0]['lu'],
                        date: rows[0]['date']
                    }
                    array_msg.push(message)
                    counter++;
                    renderMessage()

                })
            }
            else {
                //res.send({ status: 'good', data: array_msg, msg: "" });
                res.send(array_msg);
            }

        }

    })

});
function renderMembreMessage(myidUser, callback) {

    let query = "select * from users where id IN(select id_user2 as idUSER FROM messages WHERE id_user1 =" + myidUser + " GROUP BY id_user2)";
    messages.query(query, function (rows, fields, err) {
        if (err) throw err;
        return callback(rows)

        //return req.listUSER;
    })

}
router.post("/Add_historique", function (req, res, next) {


    let sql = "INSERT INTO historique (id_user, activite) VALUES ('" + req.body.user_id + "', '" + req.body.activite + "')";
    historique.query(sql, function (rows, fields, err) {
        if (err) throw err;
        res.send({ status: 'Ajout historique avec succces', data: rows });
    })
})
router.get("/list_historique/:user_id", function (req, res, next) {


    let sql = "select * from historique where id_user='" + req.params.user_id + "' ORDER BY id DESC";
    historique.query(sql, function (rows, fields, err) {
        if (err) throw err;
        res.send({ status: 'Ajout historique avec succces', data: rows });
    })
})
router.post("/UpdatePremium", function (req, res, next) {


    let sql = "update users set VIP='" + req.body.abnnmnt + "', date_abonnement= Now() where id='" + req.body.user_id + "'";
    historique.query(sql, function (rows, fields, err) {
        if (err) throw err;
        res.send({ status: 'update membre  VIP avec succces', data: rows });
    })
})
/* add annonce favoris  user */
router.get("/addfavannonces/:id_user/:id_annonce", function (req, res, next) {

    let id_user = req.params.id_user;
    let id_annonce = req.params.id_annonce;


    var list_categs = annonces.query("INSERT annonce_favoris ( id_user, id_annonce) VALUES(" + id_user + "," + id_annonce + ")", function (rows, fields, err) {
        if (err) throw err;

        res.send(rows);
        //res.send({ status: where, data: rows, msg: "" });
    });

});
/* get annonce favoris  user */
router.get("/getfavannonces/:id_user/:id_annonce", function (req, res, next) {

    let id_user = req.params.id_user;
    let id_annonce = req.params.id_annonce;


    var list_categs = annonces.query("SELECT * FROM annonce_favoris WHERE  id_user=" + id_user + " AND  id_annonce=" + id_annonce, function (rows, fields, err) {
        if (err) throw err;

        res.send(rows);
        //res.send({ status: where, data: rows, msg: "" });
    });

});
/* delete fav annonce Listing for user */
router.get("/delfavannonces/:id_user/:id_annonce", function (req, res, next) {

    let id_user = req.params.id_user;
    let id_annonce = req.params.id_annonce;

    let where = " WHERE  id_user=" + id_user + " and id_annonce=" + id_annonce;


    //var list_categs = annonces.query("SELECT A.id as ID_ance ,A.adresse as Adresse_ance ,A.* , B.* FROM annonces as A left JOIN users as B on A.auteur=B.email "+where+" ORDER BY A.id DESC", function (rows,fields,err) {
    var list_categs = annonces.query("delete from annonce_favoris " + where, function (rows, fields, err) {
        if (err) throw err;

        res.send(rows);
        //res.send({ status: where, data: rows, msg: "" });
    });

});

/* detail auteur annonce */
router.get("/user/:user_id", function (req, res, next) {

    console.log("result user:email", req.params.user_id);
    //var list_users = db2.query("Select * from users where id = '" + req.params.user_id + "' " , function (rows, fields, err) {
    var list_users = user.find('first', { where: " id  = '" + req.params.user_id + "' " }, function (rows, fields, err) {
        if (err) throw err;
        console.log("result user:email", rows);
        res.send({ status: "success", data: rows });
    });
});
/* detaille annonce */
router.get("/annonce/:id_annonce", function (req, res, next) {
    var idAnnonce = req.params.id_annonce;

    var annonce = annonces.find('first', { where: "id = '" + idAnnonce + "' " }, function (rows, fields, err) {
        if (err) throw err;
        console.log(rows)
        res.send({ status: "success", data: rows, msg: "" });

        //res.send(rows);
    });
});
/* Create New Annonce */
router.post("/offre/create", function (req, res, next) {
    try {


        offres.query("INSERT INTO offres ( id_user, id_annonce,detaille) value ('" + req.body.id_user + "','" + req.body.id_annonce + "','" + req.body.detaille + "')", function (rows, fields, err) {
            console.log('Creation offre OK!!')
            res.send({ status: "success" })
        })
        /*}
        else {
          console.log('failed!!');
          res.send({ status: "Failed" })
        }*/


    } catch (err) {
        next(err);
    }
});
/* list offre annonce */
router.get("/offres/:id_annonce", function (req, res, next) {

    //var list_offre = offres.find('all', { where: "id_annonce = '" + req.params.id_annonce + "' " }, function (rows,fields,err) {

    var list_offre = annonces.query("SELECT A.id as ID_offre , A.*,B.* FROM offres as A left JOIN users as B on A.id_user=B.id where A.id_annonce = " + req.params.id_annonce, function (rows, fields, err) {
        if (err) throw err;
        res.send({ status: "success", data: rows, msg: "" });
    });
});

//***valider offre ***/
router.put("/valid_offre/:id_offre", function (req, res, next) {
    /* Create New Annonce */
    if (req.body.etat_valid == 1) {
        var type_notif = "acceptation-offre";
        var msg_notif = " A accepté votre offre";
    }
    else if (req.body.etat_valid == 0) {
        var type_notif = "anulation-acceptation-offre";
        var msg_notif = " A annulé d\'avoir accepté votre offre!";
    }
    else if (req.body.etat_valid == 2) {
        var type_notif = "validation-offre";
        var msg_notif = " a validé son offre!";
    }
    else if (req.body.etat_valid == 3) {
        var type_notif = "annulation-offre";
        var msg_notif = " a annulé son offre!";
    }

    else if (req.body.etat_valid == 4) {
        var type_notif = "retiration-offre";
        var msg_notif = " a retiré son offre!";
    }

    try {

        offres.query("UPDATE offres set  etat_acc=" + req.body.etat_valid + " where id=" + req.params.id_offre, function (rows1, fields1, err) {
            annonces.query("UPDATE annonces set  	etat=" + req.body.etat_valid + " where id=" + req.body.id_annonce, function (rows, fields, err) {
                annonces.query("INSERT INTO notifications (id_activite, type_activite, id_user1, id_users, notification) VALUES ('" + req.body.id_annonce + "', '" + type_notif + "', '" + req.body.id_user1 + "', '" + req.body.id_user2 + "', '" + msg_notif + "') ", function (rows, fields, err) {

                    if (err) throw err;

                    res.send({ status: type_notif, data: rows })

                });
            });
        });
    } catch (err) {
        next(err);
    }
});
///delete user
router.get("/delete_user/:id_user", function (req, res, next) {

    try {

        offres.query("DELETE FROM  user  where id=" + req.params.id_annonce, function (rows1, fields1, err) {

            if (err) throw err;
            res.send({ status: "suppression annonce reussi!!" })

        });
    } catch (err) {
        next(err);
    }
});
///delete publicite
router.get("/delete_publicite/:id_publicite", function (req, res, next) {

    try {

        offres.query("DELETE FROM  publicites  where id=" + req.params.id_publicite, function (rows1, fields1, err) {

            if (err) throw err;
            res.send({ status: "suppression annonce reussi!!" })

        });
    } catch (err) {
        next(err);
    }
});
///delete annonce
router.get("/delete_annonce/:id_annonce", function (req, res, next) {

    try {

        offres.query("DELETE FROM  annonces  where id=" + req.params.id_annonce, function (rows1, fields1, err) {

            if (err) throw err;
            res.send({ status: "suppression annonce reussi!!" })

        });
    } catch (err) {
        next(err);
    }
});
///update texte_offre
router.put("/updatetext_offre/:id_offre", function (req, res, next) {

    try {

        offres.query("UPDATE offres set  detaille='" + req.body.detaille + "' where id=" + req.params.id_offre, function (rows, fields, err) {

            if (err) //throw err;
                res.send({ err })
            res.send({ status: "update offre reussi!!", data: rows })

        });
    } catch (err) {
        next(err);
    }
});
///delete offre
router.get("/delete_offre/:id_offre", function (req, res, next) {

    try {

        offres.query("DELETE FROM  offres  where id=" + req.params.id_offre, function (rows1, fields1, err) {

            if (err) throw err;
            res.send({ status: "suppression offre reussi!!" })

        });
    } catch (err) {
        next(err);
    }
});
//***accept offre ***/
router.put("/accept_offre/:id_offre", function (req, res, next) {
    /* Create New Annonce */
    try {

        offres.query("UPDATE offres set  etat_acc=" + req.body.etat_acc + " where id=" + req.params.id_offre, function (rows1, fields1, err) {
            annonces.query("UPDATE annonces set  	etat=" + req.body.etat_acc + " where id=" + req.body.id_annonce, function (rows, fields, err) {
                console.log('offre acceptée!!', rows)
                if (err) throw err;
                if (req.body.etat_valid == 2)
                    res.send({ status: "validation offre accepte!!", data: rows })
                else
                    res.send({ status: "validation offre refussée!!", data: rows })
            });
        });
    } catch (err) {
        next(err);
    }
});
//***favoris offre ***/
router.put("/favoris_offre/:id_offre", function (req, res, next) {
    /* Create New Annonce */
    try {

        offres.query("UPDATE offres set  favoris=" + req.body.favoris + " where id=" + req.params.id_offre, function (rows, fields, err) {
            console.log('offre favoris!!', rows)
            if (err) throw err;
            res.send({ status: "offre favrois!!", data: rows })
        });

    } catch (err) {
        next(err);
    }
});
/* Create New session for membre logued */
router.post("/session", function (req, res, next) {

    try {

        session.query("INSERT INTO session ( id_user) value ('" + req.body.id_user + "')", function (rows, fields, err) {

            console.log('Creation session OK!!', rows)
            if (err) throw err;
            res.send({ status: "Creation session OK!!", data: rows })
        });

    } catch (err) {
        next(err);
    }
});
/* get  session for membre logued */
router.get("/session/:id_user", function (req, res, next) {

    try {

        session.query("select id_user  from session where id_user='" + req.params.id_user + "'", function (rows, fields, err) {

            if (err) throw err;
            res.send({ status: 'success', data: rows })
        });

    } catch (err) {
        next(err);
    }
});
/*   getNotif for membre logued */
router.get("/getNotif/:id_user", function (req, res, next) {

    try {
        var sql = "SELECT N.id as ID_notif, N.*, U.* FROM `notifications` as N left join users as U on N.id_user1=U.id where FIND_IN_SET('" + req.params.id_user + "',id_users)!=0 order by N.id DESC LIMIT 50";
        session.query(sql, function (rows, fields, err) {

            if (err) throw err;
            res.send({ status: 'success', data: rows })
        });

    } catch (err) {
        next(err);
    }
});
/*   get precis Notif  */
router.get("/getNotification/:notif", function (req, res, next) {

    try {
        var sql = "SELECT * FROM `notifications`  where id='" + req.params.notif + "'";
        session.query(sql, function (rows, fields, err) {

            if (err) throw err;
            res.send({ status: 'success', data: rows })
        });

    } catch (err) {
        next(err);
    }
});
/*check if file exite */
router.get("/file_existe/:id_annonce", function (req, res, next) {
    try {
        var sql = "SELECT file_src as url from users_file where id_annonce = '" + req.params.id_annonce + "'";
        users_file.query(sql, function (rows, fields, err) {
            if (err) throw err;
            res.send({ status: 'success', data: rows })
        });
    }
    catch (err) {
        next(err);
    }
});

/*get evalution user*/
router.get("/user_evaluation/:id_user", function (req, res, next) {

    try {
        var sql = "SELECT *  FROM `avis` where id_user='" + req.params.id_user + "';";
        avis.query(sql, function (rows, fields, err) {
            const rating = rows.SumEtoile / rows.NbreEval
            if (err) throw err;
            res.send({ status: 'success', data: rows })
        });

    } catch (err) {
        next(err);
    }
});
/*get nombre etoile user*/
router.get("/user_rating/:id_user", function (req, res, next) {

    try {
        var sql = "SELECT SUM(nbre_etoile) as SumEtoile, count(*) as NbreEval FROM `avis` where id_user='" + req.params.id_user + "';";
        avis.query(sql, function (rows, fields, err) {
            if (err) throw err;
            var rating = rows[0].SumEtoile / rows[0].NbreEval
            rating = rating.toFixed(1);
            res.send({ status: 'success', rows, rating })
        });

    } catch (err) {
        next(err);
    }
});
/*update evalution user*/
router.post("/update_user_evaluation", function (req, res, next) {
    /*if(req.body.eamis==0)
    {*/
    var sql = "insert into `avis` (id_user, id_user_note, nbre_etoile, commentaire) value('" + req.body.user_id1 + "', '" + req.body.user_id2 + "', '" + req.body.evaluation + "','" + req.body.avis + "') ";
    avis.query(sql, function (rows, fields, err) {
        if (err) throw err;
        notifications.query("INSERT INTO notifications (id_activite, type_activite, id_user1, id_users, notification) VALUES ('" + req.body.id_user2 + "', 'evaluation', '" + req.body.id_user1 + "', '" + req.body.id_user2 + "', 'Vous a évalué') ", function (rows, fields, err) {
            if (err) throw err;
            var sql = "SELECT SUM(nbre_etoile) as SumEtoile, count(*) as NbreEval FROM `avis` where id_user='" + req.body.user_id1 + "';";
            avis.query(sql, function (rows, fields, err) {
                if (err) throw err;
                var rating = rows[0].SumEtoile / rows[0].NbreEval;
                rating = rating.toFixed(1);
                res.send({ status: 'success', rows, rating })
            });
        });
    });
    /*}
    else
    {
       amis.query("delete  FROM amis WHERE (id_user1 = '"+req.body.id_user1+"' and id_user2= '"+req.body.id_user2+"') or (id_user1 = '"+req.body.id_user2+"' and id_user2= '"+req.body.id_user1+"')", function (rows,fields,err) {
        if (err) throw err;
        res.send({ status: "delete amis success", data: rows });
      }); 
    }*/
});
/* delete  session for membre logued */
router.delete("/session", function (req, res, next) {

    try {

        session.query("DELETE FROM session WHERE id_user = '" + req.body.id_user + "'", function (rows, fields, err) {

            console.log('delete session OK!!', rows)
            if (err) throw err;
            res.send({ status: "delete session OK!!", data: rows })
        });

    } catch (err) {
        next(err);
    }
});
//list membres 
//router.get("/membres/:nom/:adresse/:type", function(req, res, next){
router.get("/membres/:filter", function (req, res, next) {

    let filter = req.params.filter;
    filter = filter.replace('=', '');

    let params = new URLSearchParams(JSON.parse(filter));
    let adresse = params.get("adresse");
    if (adresse) adresse = adresse.replace('+', ' ');
    let nom = params.get("nom");
    if (nom) nom = nom.replace('+', ' ');
    let type = params.get("type");

    let arrayFilter =
    {
        adresse: adresse,
        nom: nom,
        type: type,

    }
    let where = '';
    if (typeof filter != undefined && filter.length > 0) {

        Object.keys(arrayFilter).map((key, index) => {
            if (key.length > 0 && arrayFilter[key] !== null && arrayFilter[key] != '' && arrayFilter[key] != undefined) {

                if (key === 'adresse' || key === 'nom')
                    where += " and " + key + '  like "%' + arrayFilter[key] + '%" ';
                else if (key === 'type' && arrayFilter[key] === 'simple')
                    where += " and Transporteur=0 and PointDolmen=0  and Simple=0 "
                else
                    where += " and " + arrayFilter[key] + ' = 1 ';
            }
        })

    }
    user.query("select * from users where etat_actv=1 " + where, function (rows, fields, err) {
        //user.query("select * from users where etat_actv=1", function (rows,fields,err) {
        if (err) throw err;
        //res.send({ status: "success", data: rows });
        res.send(rows);
    })
})

//check if deux user sont amis
router.get("/is_amis/:id_user1/:id_user2", function (req, res, next) {

    amis.query("select * FROM amis WHERE (id_user1 = '" + req.params.id_user1 + "' and id_user2= '" + req.params.id_user2 + "') or (id_user1 = '" + req.params.id_user2 + "' and id_user2= '" + req.params.id_user1 + "')", function (rows, fields, err) {
        if (err) throw err;
        res.send({ status: "success", data: rows });
    });
});

//update liste amis
router.post("/update_liste_amis", function (req, res, next) {
    if (req.body.eamis == 1) {
        amis.query("insert into  amis (id_user1 ,id_user2, etat_acc) VALUES ('" + req.body.id_user1 + "', '" + req.body.id_user2 + "', 1)", function (rows, fields, err) {
            if (err) throw err;
            notifications.query("INSERT INTO notifications (id_activite, type_activite, id_user1, id_users, notification) VALUES ('" + req.body.id_user1 + "', 'ajout_amis', '" + req.body.id_user1 + "', '" + req.body.id_user2 + "', 'Vous a envoyé une invitation amitié') ", function (rows, fields, err) {

                if (err) throw err;
                res.send({ status: "add amis success", data: rows });
            });
        });
    }
    else if (req.body.eamis == 2) {
        amis.query("update  amis set etat_acc=2 where id_user1 ='" + req.body.id_user2 + "' and  id_user2='" + req.body.id_user1 + "'", function (rows, fields, err) {
            if (err) throw err;
            notifications.query("INSERT INTO notifications (id_activite, type_activite, id_user1, id_users, notification) VALUES ('" + req.body.id_user1 + "', 'accept_amis', '" + req.body.id_user1 + "', '" + req.body.id_user2 + "', 'a accepté votre invitation') ", function (rows, fields, err) {
                if (err) throw err;
                res.send({ status: "add amis success", data: rows });
            });
        });
    }
    else {
        if (req.body.eamis == 3) {
            type_notif = 'refus_invitation'
            msg_notif = 'a refusé votre invitation';
        }
        else {
            type_notif = 'annulation_invitation'
            msg_notif = 'a annulé son invitation';
        }
        amis.query("delete  FROM amis WHERE (id_user1 = '" + req.body.id_user1 + "' and id_user2= '" + req.body.id_user2 + "') or (id_user1 = '" + req.body.id_user2 + "' and id_user2= '" + req.body.id_user1 + "')", function (rows, fields, err) {
            if (err) throw err;
            notifications.query("INSERT INTO notifications (id_activite, type_activite, id_user1, id_users, notification) VALUES ('" + req.body.id_user1 + "', '" + type_notif + "', '" + req.body.id_user1 + "', '" + req.body.id_user2 + "', '" + msg_notif + "') ", function (rows, fields, err) {
                if (err) throw err;
                res.send({ status: "delete amis success", data: rows });
            });
        });
    }
});
//get list publicite-
router.get('/publicites', function (req, res, next) {
    var sql = "select * from publicites where DATEDIFF(Now(), date)<=30 order by id DESC";
    publicites.query(sql, function (rows, fields, err) {
        if (err) throw err;
        res.send({ status: "success", data: rows });
    })
})
//get list publicite- for user 
router.get('/publicites/:id_user', function (req, res, next) {
    var sql = "select * from publicites where id_user='" + req.params.id_user + "' order by id DESC";
    publicites.query(sql, function (rows, fields, err) {
        if (err) throw err;

        res.send({ status: "success", data: rows });
    })
})
//get list message
router.get("/messages/:id_user1/:id_user2", function (req, res, next) {

    //var sql="select A.*, B.img_prof from messages as A left JOIN users as B on A.id_user1=B.id  where (A.id_user1="+myidUser+" and A.id_user2="+idUSER+") or (A.id_user2="+myidUser+" and A.id_user1="+idUSER+") ORDER by date DESC limit 1";
    messages.query("select A.*, B.img_prof FROM messages as A left JOIN users as B on A.id_user2=B.id WHERE (A.id_user1 = '" + req.params.id_user1 + "' and A.id_user2= '" + req.params.id_user2 + "') or (A.id_user1 = '" + req.params.id_user2 + "' and A.id_user2= '" + req.params.id_user1 + "') ORDER BY A.date ASC", function (rows, fields, err) {
        if (err) throw err;
        res.send({ status: "success", data: rows });
    });
});

//sent new message
router.post("/sent_messages", function (req, res, next) {

    messages.query("insert into  messages (id_user1 ,id_user2,message) VALUES ('" + req.body.id_user1 + "', '" + req.body.id_user2 + "', '" + req.body.message + "')", function (rows, fields, err) {
        if (err) throw err;
        res.send({ status: "add amis success", data: rows });
    });
})
//marquer lu message
router.put("/marquerLuMessage/:id_user/:id_user2", function (req, res, next) {

    messages.query("update  messages set lu=0 where id_user2='" + req.params.id_user + "' and id_user1='" + req.params.id_user2 + "'", function (rows, fields, err) {
        if (err) throw err;
        res.send({ status: "marquer lu msg avec success", data: rows });
    });
})
//NOMBRE MSG NON LU BY USER
router.get("/isLuMessage/:id_user/:id_user2", function (req, res, next) {

    messages.query("select count(*) as nbrNonLu from messages  where lu=1 and id_user2='" + req.params.id_user + "' and id_user1='" + req.params.id_user2 + "' ", function (rows, fields, err) {
        if (err) throw err;
        res.send({ status: "success", data: rows });
    });
})
/* get total NUMBER FOR UNREAD MSG FOR USER X */
router.get("/getNotifMsg/:id_user", function (req, res, next) {

    try {
        var sql = "SELECT * FROM `messages` where id_user2='" + req.params.id_user + "' and lu=1;";
        session.query(sql, function (rows, fields, err) {

            if (err) throw err;
            res.send({ status: 'success', data: rows })
        });

    } catch (err) {
        next(err);
    }
});
//@type   POST
//route for post data
router.get('/upload_', function (req, res, next) {

    var dir1 = '..' + process.cwd();
    var dir2 = path.resolve(__dirname);
    //res.json({dir1,dir2})
    fs.writeFile(`${dirIMages}/2.html`, "Hello, World!", (err) => {
        if (err)
            res.send({ status: err, msg: "error to upload file!" })//throw err
        else
            res.send({ status: 'success', msg: "file upload successfully!" })//throw err
    })
})
//! Use of Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${dirIMages}`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });
//var upload = multer({dest : `${dirIMages}`}) 
//router.post("/upload", upload.single("fileData"), function (req, res, next) {
router.post("/upload", function (req, res, next) {
    //try {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

    // console.log("req.file", req.body.imgsource)
    if (!req.body.imgsource) {
        res.send({ status: "failed!", msg: "No file upload!" })
        //console.log("No file upload");
    } else {
        //if image annonce
        if (req.body.annonce_id) {
            var imgName = 'annonce-' + req.body.num + '_' + req.body.annonce_id + '_U' + req.body.user_id + '.jpeg'
            var imgsrc = `https://${req.headers.host}/images/${imgName}`;

            fs.writeFile(`${dirIMages}/${imgName}`, req.body.imgsource, 'base64', (err) => {

                //fs.rename(req.file.path, `${dirIMages}/${imgName}.jpg`, (err)=>{
                if (err)
                    res.send({ status: err, msg: "error to upload file!" })//throw err

                /*sharp(`${dirIMages}/${imgName}.jpg`).resize(200,200).jpeg({quality : 50}).toFile(`${dirIMages}/${imgName}_thumb.jpg` );
                sharp(`${dirIMages}/${imgName}.jpg`).resize(640,480).jpeg({quality : 80}).toFile(`${dirIMages}/${imgName}_preview.jpg` );*/

                //var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
                if (req.body.update) {
                    res.send({ status: 'success', msg: "Upload Image OK!!" })
                }
                else {
                    users_file.query("INSERT INTO users_file (id_user,id_annonce,file_src) VALUES(" + req.body.user_id + "," + req.body.annonce_id + ",'" + imgsrc + "')", (rows, fields, err) => {
                        if (err)
                            res.send({ status: 'failed', msg: "No file upload!" })//throw err
                        console.log('Upload Image OK!!');

                        res.send({ status: 'success', msg: "Upload Image OK!!" })

                    });
                }
            })
        }
        //if image img_prof user
        if (req.body.img_prof && req.body.img_prof != '') {
            var imgName = 'Profile-' + '_U' + req.body.user_id + '.jpeg'
            var imgsrc = `${req.headers.host}/images/${imgName}`;

            fs.writeFile(`${dirIMages}/${imgName}`, req.body.imgsource, 'base64', (err) => {
                //fs.rename(req.file.path, `${dirIMages}/${imgName}.jpg`, (err)=>{
                if (err)
                    res.send({ status: err, msg: "error to upload Image profil!" })//throw err
                users_file.query("update users set img_prof='" + imgName + "' where id=" + req.body.user_id, (rows, fields, err) => {
                    if (err)
                        res.send({ status: 'failed', msg: "No file upload!" })//throw err
                    console.log('Upload Image Profil OK!!');

                    res.send({ status: 'success', msg: "Upload Image Profil OK!!!!" })

                })
            })
        }
        //if image img_couverture user
        if (req.body.img_couverture && req.body.img_couverture != '') {
            var imgName = 'Couverture-' + '_U' + req.body.user_id + '.jpeg'
            var imgsrc = `${req.headers.host}/images/${imgName}`;

            fs.writeFile(`${dirIMages}/${imgName}`, req.body.imgsource, 'base64', (err) => {
                //fs.rename(req.file.path, `${dirIMages}/${imgName}.jpg`, (err)=>{
                if (err)
                    res.send({ status: err, msg: "error to upload Image couverture!" })//throw err

                users_file.query("update users set img_couverture='" + imgName + "' where id=" + req.body.user_id, (rows, fields, err) => {
                    if (err)
                        res.send({ status: 'failed', msg: "No file upload!" })//throw err
                    console.log('Upload Image couverture OK!!');

                    res.send({ status: 'success', msg: "'Upload Image couverture OK!!!!'" })

                })
            })
        }

        //if image publicite
        if (req.body.pub_id) {
            var imgName = 'publicite-' + req.body.num + '_' + req.body.pub_id + '_U' + req.body.user_id + '.jpeg'
            var imgsrc = `${req.headers.host}/images/${imgName}`;

            fs.writeFile(`${dirIMages}/${imgName}`, req.body.imgsource, 'base64', (err) => {
                //fs.rename(req.file.path, `${dirIMages}/${imgName}.jpg`, (err)=>{
                if (err)
                    res.send({ status: err, msg: "error to upload file publicite!" })//throw err


                //var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
                publicites.query("update publicites set image='" + imgName + "' where id=" + req.body.pub_id, (rows, fields, err) => {
                    if (err)
                        res.send({ status: 'failed', msg: "No file publicite upload!" })//throw err
                    console.log('Upload Image publicite OK!!');

                    res.send({ status: 'success', msg: "Upload Image publicite OK!!" })

                })
            })
        }

    }

});

//update nbre vue annonnce
/* All categories Listing */
router.get("/updateNbreVueAnnc/:id_annonce", function (req, res, next) {

    //var list_categs = annonces.find('all', function (rows,fields,err) {
    var list_categs = annonces.query("UPDATE annonces SET nbre_vue=nbre_vue+1 where id=" + req.params.id_annonce, function (rows, fields, err) {
        if (err) throw err;
        //res.send({ status: "success", data: rows, msg: "" });

        res.send(rows);
    });
});


//update nbre vue annonnce
/* All categories Listing */
router.get("/updateNbreVisiteProfile/:id_user", function (req, res, next) {

    //var list_categs = annonces.find('all', function (rows,fields,err) {
    var list_categs = annonces.query("UPDATE users SET nbre_visite=nbre_visite+1 where id=" + req.params.id_user, function (rows, fields, err) {
        if (err) throw err;
        //res.send({ status: "success", data: rows, msg: "" });

        res.send(rows);
    });
});
///update données user
router.post("/user/update", function (req, res, next) {
    let id = req.body.id_user,
        nom = req.body.nom,
        email = req.body.email,
        age = req.body.age,
        tel = req.body.tel,
        adresse = req.body.adresse,
        longitude = req.body.longitude,
        latitude = req.body.latitude,
        Transporteur = req.body.transporteur,
        PointDolmen = req.body.point_dolmen,
        cache = req.body.cache;
    //var list_categs = annonces.find('all', function (rows,fields,err) {
    user.query("UPDATE users SET nom='" + nom + "' , email='" + email + "',age='" + age + "',tel='" + tel + "',adresse='" + adresse + "', Transporteur=" + Transporteur + ", PointDolmen=" + PointDolmen + ", cache=" + cache + ", Userlongitude='" + longitude + "', Userlatitude='" + latitude + "'  where id=" + id, function (rows, fields, err) {
        if (err) {

            res.send({ status: "failed" });
            throw err;
            //res.send({ status: "success", data: rows, msg: "" });
        }

        res.send({ status: "success" });
    });
});

///update Password user
router.post("/user/updatePasw/:id_user/:password", function (req, res, next) {

    //var list_categs = annonces.find('all', function (rows,fields,err) {
    var list_categs = annonces.query("UPDATE users SET password='" + req.params.password + "' where id=" + req.params.id_user, function (rows, fields, err) {
        if (err) throw err;
        //res.send({ status: "success", data: rows, msg: "" });

        res.send({ status: "success" });
    });
});
router.post("/abonnement/:user_id/:choix", async (req, res) => {
    try {
        // Getting data from client
        let { amount, name } = req.body;
        // Simple validation
        if (!amount || !name)
            return res.status(400).json({ message: "All fields are required" });
        amount = parseInt(amount);
        // Initiate payment
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: "INR",
            payment_method_types: ["card"],
            metadata: { name },
        });
        // Extracting the client secret 
        const clientSecret = paymentIntent.client_secret;
        // Sending the client secret as response

        user.query("UPDATE users set  VIP=" + req.params.abnnmnt + ", date_abonnement=Now() where id=" + req.params.user_id, function (rows, fields, err) {
            res.json({ message: "Payment initiated", clientSecret });
        })
    } catch (err) {
        // Catch any error and send error 500 to client
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.post("/donate", async (req, res) => {
    try {
        // Getting data from client
        let { amount, name } = req.body;
        // Simple validation
        if (!amount || !name)
            return res.status(400).json({ message: "All fields are required" });
        amount = parseInt(amount);
        // Initiate payment
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: "INR",
            payment_method_types: ["card"],
            metadata: { name },
        });
        // Extracting the client secret 
        const clientSecret = paymentIntent.client_secret;
        // Sending the client secret as response
        res.json({ message: "Payment initiated", clientSecret });
    } catch (err) {
        // Catch any error and send error 500 to client
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
