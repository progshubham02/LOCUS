const jwt = require('jsonwebtoken');
const keys=require('../config/keys');
var jwtDecode = require('jwt-decode');
var mysql = require('mysql');

//Authorization Function//
var authorization = function (req, res, next) {
    var token = req.headers['x-access-token'];
    
    var msg = {auth: false, message: 'No token provided.'};
    if (!token) return res.status(500).send(msg);
    jwt.verify(token, keys.SECRET, function (err, decoded) {
        var msg = {auth: false, message: 'Failed to authenticate token.'};
        if (err) return res.status(500).send(msg);
        else{
            next();
        }
    });
}

module.exports = authorization;