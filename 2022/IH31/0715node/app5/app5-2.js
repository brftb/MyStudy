'use strict';
const express = require('express'); // expressパッケージの呼び出し
const mysql = require('mysql'); // mysqlパッケージの呼び出し
const config = require('./config'); // configの呼び出し

const app = express();

app.set('views engine', 'ejs'); // ejsのテンプレートを使用

//// パス指定用モジュール (初期設定)
app.use(express.json()); // get以外の値のときになにか
app.use(express.urlencoded({extended: true})); // get以外の値のときになにか
app.use(express.static(__dirname+"/public", {index: false})); // indexが優先されるのを防ぐ
app.use(express.static(__dirname+"/views", {index: false})); // indexが優先されるのを防ぐ

const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   port: 3306,
   database: 'nodetest'
}); // DB接続用オブジェクト


//// DB接続
connection.connect((error) => {
   if(error){
      console.log('error connecting' + error.stack);
      return;
   }
   console.log('connecting success');
});

//// endpoint
app.get('/', function(req, res){
   //// SELECT
   connection.query(
      "SELECT * FROM t01_users;",
      (error, results) =>{
         if(error){
            console.log('error query' + error.stack);
            return;
         }
         // res.send(JSON.stringify(results))
         res.render('index5-2.ejs',{
            value1: '<h2>HELLO</h2>',
            value2: results
         });
      }
   );
});
app.get('/users', (req, res) => {
   console.log("GET['id'] : " + req.query.id);
   console.log("GET['name'] : " + req.query.name);
   console.log("GET['email'] : " + req.query.email);
   console.log("GET['password'] : " + req.query.password);
   let inputData = [
      req.query.id,
      req.query.name,
      req.query.email,
      req.query.password
   ];
   // INSERT
   connection.query(
      "INSERT INTO t01_users(id,username,email,password) VALUES(?, ?, ?, ?);", inputData,
      (error, results) =>{
         if(error){
            console.log('error query' + error.stack);
            return;
         }
         res.send('DB Update');
         console.log('completed insert query');
      }
   );
});


// NotFound
app.use(function(req,res){
   res.status(400);
   res.sendFile(__dirname+"/views/notfound.html");
});

//// 9000番ポートで待ち受ける
app.listen(config.port);
console.log("サーバ起動" + 9000 + "　ポート監視中");
