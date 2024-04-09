'use strict';
const http = require('http'); // モジュールインストール
const app = http.createServer();

app.on('request', function(req,res){
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.write('Hello app1-2!!!');
   res.end();
});

// 9000番ポートで待ち受ける
app.listen(9000, function(){
   console.log("サーバ起動" + 9000 + "　ポート監視中");
});


// node app1-1
// ブラウザで「localhost:9000」見てみ
// control + C で強制終了
