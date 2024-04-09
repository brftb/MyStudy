'use strict';
const config = require('./config'); // configの呼び出し
const express = require('express');
const app = express();

//// パス指定用モジュール
app.use(express.static(__dirname+"/public"));

//// endpoint
app.get('/', function(req, res){
   res.sendFile(__dirname+"/views/index.html");
});
app.post('/', function(req, res){
   res.send('Hello Express! post');
});
app.get('page1', function(req, res){
   res.send('Hello Express! get');
});
app.delete('users', function(req, res){
   // DBとかでデータ削除の処理にする
});

//// 9000番ポートで待ち受ける
app.listen(config.port);
console.log("サーバ起動" + 9000 + "　ポート監視中");
