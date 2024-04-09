'use strict';
const mysql = require('mysql'); // mysqlパッケージの呼び出し
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   port: 3306,
   database: 'nodetest'
}); // DB接続用オブジェクト


//// 画面呼び出し
const config = require('./config'); // configの呼び出し
const express = require('express');
const { stringify } = require('querystring');
const app = express();

app.set('views engine', 'ejs'); // ejsのテンプレートを使用

//// パス指定用モジュール
app.use(express.json()); // get以外の値のときになにか
app.use(express.urlencoded({encoded: true})); // get以外の値のときになにか
app.use(express.static(__dirname+"/public", {index: false})); // indexが優先されるのを防ぐ
app.use(express.static(__dirname+"/views", {index: false})); // indexが優先されるのを防ぐ


//// DB接続
connection.connect((error) => {
   if(error){
      console.log('error connecting' + error.stack);
      return;
   }
   console.log('connecting success');
});

//// endpoint
app.get('/app5-1', function(req, res){
   //// INSERT
   // connection.query(
   //    "INSERT INTO t01_users(id,email,username,password) VALUES('888', 'haru@hal.ac.jp', 'はるたろう', 'taro');",
   //    (error, results) =>{
   //       if(error){
   //          console.log('error query' + error.stack);
   //          return;
   //       }
   //       res.send('DB Update');
   //    }
   // );
   //// SELECT
   connection.query(
      "SELECT * FROM t01_users;",
      (error, results) =>{
         if(error){
            console.log('error query' + error.stack);
            return;
         }
         res.send(results);
         // res.send(JSON.stringify(results))
      }
   );
   //// DB切断(webサーバー化したら切断はしない)
   // connection.destroy();
});

// NotFound
app.use(function(req,res){
   res.status(400);
   res.sendFile(__dirname+"/views/notfound.html");
});

//// 9000番ポートで待ち受ける
app.listen(config.port);
console.log("サーバ起動" + 9000 + "　ポート監視中");
