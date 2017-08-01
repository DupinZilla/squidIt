var Instagram = require('../model');
var request = require("request");
var clientID = "c45e7f9a72574dbbb1001a398d6a5b39";
var clientSecret = "a2a6727194db4088869715043cc46782";
var redirect_uri = "http://localhost:3000/api/instagram/callbackAuthentication";

var _ctrl = {
    getAuthorize: function (req, res, next) {
        res.redirect("https://api.instagram.com/oauth/authorize/?client_id=" +
            clientID + "&redirect_uri=" + redirect_uri + "&response_type=code" + "&scope=public_content")
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
                    res.status(httpResponse.statusCode).json(err);
                req.session.person = body;
                res.status(200).json({"message":"usuario autenticado com sucesso"});
            });
    },
    getInstaTags: function (req, res, next) {
        var sessao = JSON.parse(req.session.person);
        request('https://api.instagram.com/v1/tags/' + req.query.q +
            '/media/recent?access_token=' + sessao.access_token,
            function (err, httpResponse, body) {
                if (err)
                    res.status(httpResponse.statusCode).json(err);
                res.status(200).json(body);
            });
    }
};


module.exports = _ctrl;