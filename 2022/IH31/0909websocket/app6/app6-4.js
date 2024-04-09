'use strict';
const express = require('express'); // expressパッケージの呼び出し
const mysql = require('mysql'); // mysqlパッケージの呼び出し
const app = express();

const http_socket = require('http').Server(app);
const io_socket = require('socket.io')(http_socket); //socket対応

app.set('view engine', 'ejs'); // ejsのテンプレートを使用

//// パス指定用モジュール (初期設定)
app.use(express.json()); // get以外の値のときになにか
app.use(express.urlencoded({extended: true})); // get以外の値のときになにか
app.use(express.static(__dirname+"/public", {index: false})); // indexが優先されるのを防ぐ
app.use(express.static(__dirname+"/views", {index: false})); // indexが優先されるのを防ぐ


// DB接続用オブジェクト
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   port: 3306,
   database: 'nodetest'
});
//// DB接続
connection.connect((error) => {
   if(error){
      console.log('error connecting' + error.stack);
      return;
   }
   console.log('connecting success');
});


//// endpoint
app.get('/', (req, res) => {
   //// SELECT
   connection.query(
      "SELECT * FROM t01_chatmessage_604;",
      (error, results) =>{
         if(error){
            console.log('error query' + error.stack);
            return;
         }
         // res.send(JSON.stringify(results))
         res.render('index6-4.ejs',{
            value: results
         });
      }
   );
});

// NotFound
app.use(function(req,res){
   res.status(400);
   res.sendFile(__dirname+"/views/notfound.html");
});

//// 9000番ポートで待ち受ける
http_socket.listen(9000);
console.log("サーバ起動" + 9000 + "　ポート監視中");


//// クライアントからの接続
io_socket.on('connection',function(socket){
   console.log('connected');
   // クライアント（ブラウザ）からサーバ（Node.js）へのSocket受信待ち
   socket.on('c2s',function(msg){ // データ「c2s:msg」を受信したら
      console.log('c2s[input1]: ' + msg.input1);
      console.log('c2s[input2]: ' + msg.input2);
      io_socket.emit('s2c',msg); // データ「s2c:msg」を送信

      // DBに格納
      let inputData = [
         0,
         msg.input1,
         msg.input2
      ];
      // INSERT
      connection.query(
         "INSERT INTO t01_chatmessage_604(chat_id,input1,input2) VALUES(?, ?, ?);", inputData,
         (error, results) =>{
            if(error){
               console.log('error query' + error.stack);
               return;
            }
            console.log('completed insert query');
         }
      );
   });
});
