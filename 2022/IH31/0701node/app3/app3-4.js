'use strict';
const config = require('./config'); // configの呼び出し
const express = require('express');
const app = express();

//// パス指定用モジュール
app.use(express.json()); // get以外の値のときに必要
app.use(express.urlencoded({encoded: true})); // get以外の値のときに必要
app.use(express.static(__dirname+"/public", {index: false})); // indexが優先されるのを防ぐ
app.use(express.static(__dirname+"/views", {index: false})); // indexが優先されるのを防ぐ

//// endpoint
app.get('/', function(req, res){
   console.log("get_data:"+req.query.text_get);
   // document.getElementById("output_get").innerHTML = "<h2>"+req.query.text_get+"</h2>";
   res.sendFile(__dirname+"/views/index.html");
});
app.post('/', function(req, res){
   console.log("post_data:"+req.body.text_post);
   // document.getElementById("output_post").innerHTML = "<h2>"+req.body.text_post+"</h2>";
   res.sendFile(__dirname+"/views/index.html");
});
app.get('/page1', function(req, res){
   console.log("get_data:"+req.query.text_get);
   res.sendFile(__dirname+"/views/page1.html");
});

//// 9000番ポートで待ち受ける
app.listen(config.port);
console.log("サーバ起動" + 9000 + "　ポート監視中");
