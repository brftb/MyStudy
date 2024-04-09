'use strict';
const config = require('./config'); // configの呼び出し
const express = require('express');
const app = express();

app.set('views engine', 'ejs'); // ejsのテンプレートを使用

//// パス指定用モジュール
app.use(express.json()); // get以外の値のときになにか
app.use(express.urlencoded({encoded: true})); // get以外の値のときになにか
app.use(express.static(__dirname+"/public", {index: false})); // indexが優先されるのを防ぐ
app.use(express.static(__dirname+"/views", {index: false})); // indexが優先されるのを防ぐ

//// endpoint
app.get('/app4-2', function(req, res){
   res.render('index4-2.ejs',{
      value1: '<h2>HAL</h2>',
      value2:'大阪'
   });
});

// NotFound
app.use(function(req,res){
   res.status(400);
   res.sendFile(__dirname+"/views/notfound.html");
});

//// 9000番ポートで待ち受ける
app.listen(config.port);
console.log("サーバ起動" + 9000 + "　ポート監視中");
