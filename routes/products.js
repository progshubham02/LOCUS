const express = require('express');
const router = express.Router();
const conn = require('../config/database');
const moment = require('moment');
var async = require('async');
var formidable = require('formidable');
const  getQuery = require('../config/database');
const path = require('path');
const gcm = require('node-gcm');
const mv = require('mv');


router.post('/',async function(req,res){
    try{
        const {sId} = req.body;
        const result = await  getQuery("SELECT * FROM products WHERE sId=?",[sId]);
        
        res.send({code:1,products: result});
    }catch(err){
        return res.send({code:0,msg:err});
    }
});

router.post('/edit',async function(req,res){
    try{
        const {pId} = req.body;
        const result = await  getQuery("SELECT a.*,b.* FROM products AS a INNER JOIN system_integrators AS b ON a.sId=b.sId WHERE pId=?",[pId]);
        res.send({code:1,members:result});

    }catch(err){
        return res.send({code:0, msg:err});
    }
})

router.post('/edit/update', async (req,res)=>{
    try{
        const {pId,name,email} = req.body;
        // const result = await getQuery("UPDATE ")


    }catch(err){
        res.send({code:0,msg:err})
    }

});

router.post('/delete',async (req,res)=>{
    try{
        const {pId} = req.body;
        const result = await  getQuery("DELETE FROM products AS a INNER JOIN sub_systems AS b ON a.pId = b.pId INNER JOIN components AS c ON b.ssId = c.ssId INNER JOIN vendor_map AS d ON c.cId=d.cId WHERE a.pId=?",[pId]);
        res.send({code:1,msg:"Sub System deleted!!!"});
    }catch(err){
        throw err;
    }
});

router.post('/details/:/id',async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await getQuery("SELECT a.details AS p_details,a.risk AS p_risk,b.details AS ss_details,b.risk AS ss_risk,c.details AS c_details,c.risk AS c_risk,e.username AS v_username FROM products AS a INNER JOIN sub_systems AS b ON a.pId=b.pId INNER JOIN components AS c ON b.ssId=c.ssId INNER JOIN vendor_map AS d ON c.cId=d.cId INNER JOIN vendor AS e ON d.vId = e.vId WHERE pId = ?",[id]);
        res.send({code:1,product_details: result});

    }catch(err){
        res.send({code:0,msg:err})
    }
});

router.post('/add',async (req,res)=>{
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