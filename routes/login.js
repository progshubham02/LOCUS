const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const jwt = require('jsonwebtoken');
const keys=require('../config/keys');
var async = require('async');
var fs = require('fs');
const moment = require('moment');

router.post('/login',function(req,res){
  try{
      const {username,password} = req.body;
      var sql="SELECT * FROM system_integrators WHERE email=?";
      pool.query(sql,[username],function(err,result){
      if(result.length)
      {
        if(password == result[0].password)
        {
          if(err) 
          res.send({code:0});
          else
          {
              jwt.sign({username: result[0].username},keys.SECRET, (err,token)=>{
              if(err) return res.send({code:4,msg:'Error'});
              res.send({code:1,details:result[0],token});
            });
          }
        }
        else
        {
          res.send({code:2,msg:`Password Doesn't Match`});
        }
      }
      else
      {
        res.send({code:3,msg:'Not registered!!'});
      }
    });
  }catch(err){
    return res.send({code:0,msg:err});
  }
    
});

module.exports = router;