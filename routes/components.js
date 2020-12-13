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


router.post('/:id',async function(req,res){
    try{
        const {ssId} = req.body;
        const result = await  getQuery("SELECT * FROM components WHERE ssId=?",[ssId]);
        res.send({code:1,components: result});
    }catch(err){
        return res.send({code:0,msg:err});
    }
});

router.post('/edit',async function(req,res){
    try{
        const {cId} = req.body;
        const result = await  getQuery("SELECT a.details,c.username,c.password FROM components AS a INNER JOIN sub_systems AS b ON a.ssId=b.ssId INNER JOIN products AS c ON b.sId = c.sId INNER JOIN system_integrators AS d ON c.sId=d.sId WHERE a.cId=?",[cId]);
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
        const {cId} = req.body;
        const result = await  getQuery("DELETE FROM components AS a INNER JOIN vendor_map AS b ON a.cId=b.cId WHERE a.cId=?",[cId]);
        res.send({code:1,msg:"Component deleted!!!"});
    }catch(err){
        res.send({code:0,msg:err});
    }
});



// router.post('/details/:/id',async (req,res)=>{
//     try{
//         const id = req.params.id;
//         const result = await getQuery("SELECT b.details AS c_details,b.risk AS c_risk,e.username AS v_username FROM components AS b ON b.ssId=c.ssId INNER JOIN vendor_map AS d ON c.cId=d.cId INNER JOIN vendor AS e ON d.vId = e.vId WHERE ssId = ?",[id]);
//         res.send({code:1,product_details: result});

//     }catch(err){
//         throw err;
//     }
// });

router.post('/add',async (req,res)=>{
    try{
        const {
            name,
            ssId,
            recomendedDesign,
            reqFile
        } = req.body;

        const result = await getQuery("INSERT INTO components(`details`,`recomendedDesign`,`ssId`,`reqFile`,`finalDesign`,`risk`) VALUES(?,?,?,?,?,?)",[name,recomendedDesign,ssId,reqFile,0,0]);
        res.send({code:1,msg:"Component Added"});

    }catch(err){
        res.send({code:0,msg:"Product Added"});
    }
})

module.exports = router;