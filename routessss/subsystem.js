const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const moment = require('moment');
var async = require('async');
var formidable = require('formidable');
const  getQuery = require('../config/database');
const path = require('path');
const gcm = require('node-gcm');
const mv = require('mv');
const authorization = require('../helper/jwt');


router.post('/', authorization,async function(req,res){
    try{
        console.log("here")
        const {pId} = req.body;
        const result = await pool.query("SELECT * FROM sub_systems WHERE pId=? AND flag=0",[pId]);
        res.send({code:1,subsystem: result});
    }catch(err){
        return res.send({code:0,msg:err});
    }
});

router.post('/edit', authorization,async function(req,res){
    try{
        const {ssId} = req.body;
        const result = await  getQuery("SELECT a.details,c.username,c.password FROM sub_systems AS a INNER JOIN products AS b ON a.pId=b.pId INNER JOIN system_integrators AS c ON b.sId=c.sId WHERE a.ssId=?",[ssId]);
        res.send({code:1,members:result});

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
        const {ssId} = req.body;
        const result = await  getQuery("DELETE FROM sub_systems AS a INNER JOIN components AS b ON a.ssId=b.ssId INNER vendor_map AS c ON b.cId = c.cId WHERE a.ssId=?",[ssId]);
        res.send({code:1,msg:"Product deleted!!!"});
    }catch(err){
        res.send({code:0,msg:err});
    }
});



router.post('/details', authorization,async (req,res)=>{
    try{
        const {ssId} = req.body;
        const result = await getQuery("SELECT b.details AS ss_details,b.risk AS ss_risk,c.details AS c_details,c.risk AS c_risk,e.username AS v_username FROM sub_systems AS bINNER JOIN components AS c ON b.ssId=c.ssId INNER JOIN vendor_map AS d ON c.cId=d.cId INNER JOIN vendor AS e ON d.vId = e.vId WHERE ssId = ?",[ssId]);
        res.send({code:1,product_details: result});

    }catch(err){
        throw err;
    }
});

router.post('/add', authorization,async (req,res)=>{
    try{
        const {
            name,
            username,
            pId
        } = req.body;

        const result = await getQuery("INSERT INTO sub_systems(`details`,`pId`,`risk`) VALUES(?,?,?)",[name,pId,0]);
        res.send({code:1,msg:"SubSystem Added"});

    }catch(err){
        res.send({code:0,msg:"Product Added"});
    }
})

module.exports = router;