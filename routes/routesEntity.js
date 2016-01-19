var express=require('express');

var routes=function (Entity) {
  var router=express.Router();


//the next callback method can be any of GET DELET POST PUT OR PATCH
  router.use('/:entityId',function (req,res,next) {
    Entity.findById(req.params.entityId,function (err,result) {
      if(err) res.status(500).send(err);
      else if (result) {
          req.book=result;
          next();
      }{
        res.status(404).send("no such entity exist in the database");
      }
    });
  })
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
                res.status(201).send(req.book);
            })
            .put(function (req,res) {
                 for( prop in req.body){
                    req.book[prop]=req.body[prop];
                  }
                  req.book.save();
                  res.status(201).send(req.book);
                });



            return router;
  }

module.exports=routes;
