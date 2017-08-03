var Instagram = require('../model');
var request = require("request");
var clientID = "c45e7f9a72574dbbb1001a398d6a5b39";
var clientSecret = "a2a6727194db4088869715043cc46782";
var redirect_uri = "http://localhost:3000/api/instagram/callbackAuthentication";

var _ctrl = {
    getAuthorize: function (req, res, next) {
        res.json({
            url: "https://api.instagram.com/oauth/authorize/?client_id=" +
            clientID + "&redirect_uri=" + redirect_uri + "&response_type=code" + "&scope=public_content"
        })
    },
    getCallbackAuthentication: function (req, res, next) {
        var query = req.query

        var payload = {
            "client_id": clientID,
            "client_secret": clientSecret,
            "grant_type": "authorization_code",
            "redirect_uri": redirect_uri,
            "code": query.code
        }
        request.post({ url: 'https://api.instagram.com/oauth/access_token', form: payload },
            function (err, httpResponse, body) {
                if (err)
                    return res.status(httpResponse.statusCode).json(err);
                req.session.person = body;
                return res.redirect('../../../index.html');
            });
    },
    getInstaTags: function (req, res, next) {
        var sessao = JSON.parse(req.session.person);
        request('https://api.instagram.com/v1/tags/' + req.query.q +
            '/media/recent?access_token=' + sessao.access_token,
            function (err, httpResponse, body) {
                if (err)
                    return res.status(httpResponse.statusCode).json(err);
                var dados = JSON.parse(body);
                // res.json(dados); //Funcional até aqui
                var fotos = [];
                for (pic in dados.data) {
                    var element = dados.data[pic];
                    fotos.push(element.images.standard_resolution)
                }
                var objeto = {
                    hashtag: req.query.q,
                    image: fotos
                }
                var instagram = new Instagram(objeto);


                instagram.save(function (err, result) {
                    if (err)
                        return res.status(500).json("ERRO do mongo " + err)
                });
                return res.status(200).json(dados.data);
            });
    },

    
    getListHashTag: function (req, res, next) {
        Instagram.find(function (err, hashtags) {
            if (err)
                return res.status(500).json("ERRO do mongo " + err)
            return res.status(200).json(hashtags);
        })
    },
    getHashTag: function (req, res, next) {
        Instagram.findById({ "_id": req.params.id }, function (err, hashtags) {
            if (err)
                return res.status(500).json("ERRO do mongo " + err)
            return res.status(200).json(hashtags);
        })
    },

    deleteHashTag: function (req, res, next) {
        Instagram.remove({ "_id": req.params.id }, function (err, hashtags) {
            if (err)
                return res.status(500).json("ERRO do mongo " + err)
            return res.status(200).json(hashtags);
        })
    }
};


module.exports = _ctrl;