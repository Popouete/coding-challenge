var bodyParser= require('body-parser');
var fs = require('fs');

var urlencodeParser = bodyParser.urlencoded({ extended: false});
var data=[];
var found=false;
var i=0;
var jsonFile = fs.readFileSync("controllers/langage.json");
const doc = JSON.parse(jsonFile);

module.exports= function(app){

app.get('/', function(req, res){
    res.redirect('/ninjify');
});

app.get('/ninjify', function(req, res){
    res.render('ninjify', {qs:req.query});
});

app.post('/ninjify',urlencodeParser , function(req, res){
    found=false;
    i=0;
    //looking for the name
    while (found==false && i<doc.length){
        if (doc[i].name == req.body.x) {
            found=true;
        }else {
            i++;
        }
    }

    if(found){
        //adding funny first name and last name
        data=[];
        data.push(req.body);
        var array = ["Chan","Chung","Hitachi","Lee","Kong","Tao","WongTong","Wu"];
        data.push({lName:array[Math.floor(Math.random() * array.length)]});
        array = ["Caporal","General","Ninja","Maître","Rambo","Rocky","Senpai","Samouraï","Sensei"];
        data.push({fName:array[Math.floor(Math.random() * array.length)]});
        data.push({bigName:data[2].fName+' '+data[0].x+ ' ' + data[1].lName});
        res.render('ninjify-name', {data});
    }else{
        //return to index page
        res.render('ninjify', {qs:req.body});
    }
});

app.use(function(req, res, next){
    res.status(404).render('404');
});

};
