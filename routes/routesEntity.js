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
                  req.book.save(function(err){
                    if(err) res.status(404).send('something goes wrong');
                    else {
                      res.status(201).json(req.book);
                    }
                  });

                })
            .patch(function (req,res) {
              for( prop in req.body){
                 req.book[prop]=req.body[prop];
               }
               req.book.save(function(err){
                 if(err) res.status(404).send(err);
                 else {
                   res.status(201).json(req.book);
                 }
               });

            })
            .delete(function (req,res) {
              req.book.remove(function (err) {
                if(err) res.status(404).send(err);
                else {
                  res.status(204).send('successfuly removed')
                }
              })
            });



            return router;
  }

module.exports=routes;
