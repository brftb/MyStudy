'use strict';
const config = require('./config'); // configの呼び出し
const express = require('express');
const app = express();

//// パス指定用モジュール
app.use(express.json()); // get以外の値のときに必要
app.use(express.urlencoded({encoded: true})); // get以外の値のときに必要
app.use(express.static("/public"));

//// endpoint
app.get('/', function(req, res){
   console.log("get_data:"+req.query.text_get); // 受信した値
   res.sendFile(__dirname+"/views/index.html");
});
app.post('/', function(req, res){
   console.log("post_data:"+req.body.text_post); // 受信した値
   res.sendFile(__dirname+"/views/index.html");
});


//// 9000番ポートで待ち受ける
app.listen(config.port);
console.log("サーバ起動" + 9000 + "　ポート監視中");
