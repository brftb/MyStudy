'use strict';

const port = 9000;
const http = require('http');
const app = http.createServer();

app.on('request', function(request,response){
   const body = [];
   request.on("data", function(bodydata){
      console.log("----data----");
      console.log(bodydata);
      console.log("-=-=-=-+-=-=-=-");
      body.push(bodydata);
   });
   request.on("end", function(){
      const body_string = Buffer.concat(body).toString();
      console.log("Request body contents:" + body_string);
      if(body_string == ''){return 0}
      const array = JSON.parse('{"' + decodeURI(body_string.replace(/&/g,"\",\"").replace(/=/g,"\":\"")) + '"}');
      for(const key in array){
         console.log("key:", key, " value:", array[key]);
      }
   });
   console.log("リクエストを受信しました。");
   console.log(request.method);
   console.log(request.url);
   console.log(request.headers);

   response.writeHead(200, {'Content-Type': 'text/plain'});
   const responseMessage = "<h1>Hello Request POST</h1>";
   response.end(responseMessage);
});

// 9000番ポートで待ち受ける
app.listen(port);
console.log("サーバ起動" + 9000 + "　ポート監視中");

// ターミナルで「curl -X POST "username=HAL&pass=OSAKA" http://localhost:9000/」
