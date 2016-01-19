var express=require('express');

var routes=function (Entity) {
  var router=express.Router();
  router.route('/')
            .post(function (req,res) {
              var entity=new Entity(req.body);
              entity.save();
              console.log("the posted Entity",entity);
              res.status(201).send(entity)
            })
            .get(function (req,res) {
              var query={};
              if(req.query.genre){
                query.genre=req.query.genre;
              }
              Entity.find(query,function (err,response) {
                if(err) res.status(500).send(err);
                else {
                  res.json(response)
                }
              })
            });
  router.route('/:entityId')
            .get(function (req,res) {
              Entity.findById(req.params.entityId,function (err,result) {
                if(err) res.status(500).send(err);
                else {
                  res.status(201).send(result);
                }
              })
            })
            .put(function (req,res) {
              Entity.findById(req.params.entityId,function (err,result) {
                if(err) res.status(500).send(err);
                else {

                  for( prop in req.body){
                    result[prop]=req.body[prop];
                  }
                  result.save();
                  res.status(201).send(result);
                }
              })
            });

            return router;
  }

module.exports=routes;
