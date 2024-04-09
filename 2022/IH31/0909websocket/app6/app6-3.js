'use strict';
const express = require('express'); // expressパッケージの呼び出し
const app = express();

const http_socket = require('http').Server(app);
const io_socket = require('socket.io')(http_socket); //socket対応

app.set('view engine', 'ejs'); // ejsのテンプレートを使用

//// パス指定用モジュール (初期設定)
app.use(express.json()); // get以外の値のときになにか
app.use(express.urlencoded({extended: true})); // get以外の値のときになにか
app.use(express.static(__dirname+"/public", {index: false})); // indexが優先されるのを防ぐ
app.use(express.static(__dirname+"/views", {index: false})); // indexが優先されるのを防ぐ


//// endpoint
app.get('/', (req, res) => {
   res.render('index6-3.ejs');
});

app.get('/chat1', (req, res) => {
   console.log('join chat1');
   res.render('chat1.ejs');
});
app.get('/chat2', (req, res) => {
   res.render('chat2.ejs');
});
app.get('/chat3', (req, res) => {
   res.render('chat3.ejs');
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
   socket.on('c2s-chat1',function(msg){ // データ「c2s:msg」を受信したら②
      console.log('c2s-chat1: ' + msg);
      io_socket.emit('s2c-chat1',msg); // データ「s2c:msg」を送信③
   });
   socket.on('c2s-chat2',function(msg){ // データ「c2s:msg」を受信したら②
      io_socket.emit('s2c-chat2',msg); // データ「s2c:msg」を送信③
   });
   socket.on('c2s-chat3',function(msg){ // データ「c2s:msg」を受信したら②
      io_socket.emit('s2c-chat3',msg); // データ「s2c:msg」を送信③
   });
});
