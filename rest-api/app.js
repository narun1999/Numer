var express = require('express');
var app = express();
var fs = require("fs"); //อ่านไฟล์ user.json
var cors = require('cors');
app.use(cors());
const mongoose = require('mongoose')
app.use(express.json())

//mongoose.connect('mongodb://localhost:27017/Numer');
mongoose.connect('mongodb+srv://narun:19345109@numer-hwmkl.mongodb.net/Numer');
var Schema = mongoose.Schema;

var mySchema = mongoose.Schema({
    key : String,
    fx : String,
    xl : Number,
    xr : Number
});

var mySchema2 = mongoose.Schema({
    key : String,
    fx : String,
    a : Number,
    b : Number
});

var mySchema3 = mongoose.Schema({
    key : String,
    fx : String,
    a : Number,
    b : Number,
    c : Number
});

var mySchema4 = mongoose.Schema({
    key : String,
    fx : String,
    a : Number,
    b : Number,
    n : Number
});

var myModel = mongoose.model('Mymodel', mySchema, 'testcase');
var myModel2 = mongoose.model('Mymodel2',mySchema2, 'testcase');
var mymodel3 = mongoose.model('Mymodel3',mySchema3,'testcase');
var mymodel4 = mongoose.model('Mymodel4',mySchema3,'testcase');
console.log('connect')

app.get('/bisection', function(req, res, next){
    myModel.find({key: 'bisection'}, function(err, docs){
        console.log(docs)
        res.json(docs)
    })
});

app.get('/falseposition', function(req, res, next){
    myModel.find({key: 'falseposition'}, function(err, docs){
        console.log(docs)
        res.json(docs)
    })
});

app.get('/trapezoidal', function(req, res, next){
    myModel2.find({key: 'trapezoidal'}, function(err, docs){
        console.log(docs)
        res.json(docs)
    })
});

app.get('/simpson', function(req, res, next){
    mymodel3.find({key: 'simpson'}, function(err, docs){
        console.log(docs)
        res.json(docs)
    })
});

app.get('/composite', function(req, res, next){
    mymodel4.find({key: 'composite'}, function(err, docs){
        console.log(docs)
        res.json(docs)
    })
});
/*
//GET Method ดึงข้อมูลมาทั้งหมด
app.get('/getUsers', function(req, res){
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function(err, data){
        console.log(data); //data คือ ก้อนข้อมูลของ user ทุกคน
        res.end(data);
    });
});

//GET Method แบบมีเงื่อนไข id
app.get('/getUsers/:id', function(req,res){
    fs.readFile(__dirname + "/" + "user.json",'utf8', function(err, data){
        var users = JSON.parse(data); //แปลงข้อมูลให้เป็นก้อน
        var user = users["user" + req.params.id] //เพิ่มเงื่อนไข
        console.log(user);
        res.end(JSON.stringify(user));
    });
});

/*var user = {
    "user4" : {
        "name" : "kongruksiam",
        "password" : "5555",
        "progession" : "programer",
        "id" : 4
    }
}*/
/*
//ลบข้อมูล
app.delete('/delUser/:index', function(req,res){
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function(err,data){
        data = JSON.parse(data);
        delete data["user" + req.params.index];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

app.post('/addUser', function(req,res){
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function(err,data){
        data = JSON.parse(data);
        data["user4"] = user["user4"]; //เพิ่มข้อมูลใหม่มาจากตัวแปร user
        console.log(data);
        res.end(JSON.stringify(data));
    });
});
*/
var server = app.listen(4000,function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Application Run At http://%s:%s",host, port)
});