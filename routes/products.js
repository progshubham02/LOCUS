const express = require('express');
const router = express.Router();
const conn = require('../config/database');
const moment = require('moment');
var async = require('async');
var formidable = require('formidable');
const  pool = require('../config/database');
const path = require('path');
const gcm = require('node-gcm');
const mv = require('mv');
const authorization = require('../helper/jwt');


router.post('/', authorization, async function(req,res){
    try{
        const {sId} = req.body;
        // console.log("hersse",sId)
        const result = await pool.query("SELECT * FROM products WHERE sId=? AND flag=0",[sId]);
        // console.log(result)
        res.send({code:1,products: result});
    }catch(err){
        return res.send({code:0,msg:err});
    }
});

router.post('/edit', authorization,async function(req,res){
    try{
        const {pId} = req.body;
        const result = await  pool.query("SELECT a.*,b.* FROM products AS a INNER JOIN system_integrators AS b ON a.sId=b.sId WHERE pId=?",[pId]);
        res.send({code:1,data:result});

    }catch(err){
        return res.send({code:0, msg:err});
    }
})

router.post('/edit/update', authorization, async (req,res)=>{
    try{
        const {pId,name,email} = req.body;
        // const result = await getQuery("UPDATE ")


    }catch(err){
        res.send({code:0,msg:err})
    }

});

router.post('/delete', authorization,async (req,res)=>{
    try{
        // console.log("delete",req.body)
        const {pId} = req.body;
        const result = await  pool.query("UPDATE products SET flag = 1 WHERE pId=?",[pId]);
        res.send({code:1,msg:"Product deleted!!!"});
    }catch(err){
        throw err;
    }
});

router.post('/details', authorization,async (req,res)=>{
    try{
        const {pId} = req.body;
        const result = await pool.query("SELECT a.details AS p_details,a.risk AS p_risk,b.details AS ss_details,b.risk AS ss_risk,c.details AS c_details,c.risk AS c_risk,e.username AS v_username FROM products AS a INNER JOIN sub_systems AS b ON a.pId=b.pId INNER JOIN components AS c ON b.ssId=c.ssId INNER JOIN vendor_map AS d ON c.cId=d.cId INNER JOIN vendor AS e ON d.vId = e.vId WHERE pId = ?",[pId]);
        res.send({code:1,product_details: result});

    }catch(err){
        res.send({code:0,msg:err})
    }
});

router.post('/add', authorization,async (req,res)=>{
    try{
        const {
            name,
            username,
            pId
        } = req.body;

        const result = await pool.query("INSERT INTO sub_systems(`details`,`pId`,`risk`) VALUES(?,?,?)",[name,pId,0]);
        res.send({code:1,msg:"SubSystem Added"});

    }catch(err){
        res.send({code:0,msg:"Product Added"});
    }
});


module.exports = router;