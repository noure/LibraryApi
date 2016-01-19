var express=require('express'),
    mongoose=require('mongoose'),
    bodyParser=require('body-parser');

var app=express();
var db=mongoose.connect('mongodb://localhost/bookAPI');
var port=process.env.PORT || 3000;

var Book=require('./models/bookModel');
var Author=require('./models/authorModel');
var bookRouter=require('./routes/routesEntity')(Book);
var authorRouter=require('./routes/routesEntity')(Author);

app.listen(port,function(){
  console.log("gulp listening on the port", port);
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api/books',bookRouter);
app.use('/api/author',authorRouter);


app.get('/', function(req,res){
      res.send('welecom to the book API');
});
