'use strict';
const config = require('./config'); // configの呼び出し
const contenttype = require('./contenttype'); // contenttypeの呼び出し
const http = require('http'); // モジュールインストール
const fs = require('fs');
const app = http.createServer();

app.on('request', function(request,response){
   // URLを取得して「/」かそれ以外かを判別
   const url = request.url;
   console.log(url);
   if(url == "/"){
      response.writeHead(200,{"content-type": "text/html"});
      fs.readFile(config.routeResponseMap[url],function(error, data){
         response.end(data);
      });
   }else{
      // 拡張子によって動きを変える
      let filetype = "";
      for(let key in contenttype.fileContentTypePathMap){
         if(url.indexOf(key) != -1){
            filetype = key;
         }
      }
      if(filetype == ""){
         sendErrorResponse(response);
      }else{
         response.writeHead(200, {'Content-Type': contenttype.fileContentTypePathMap[filetype]["content-type"]});
         customReadFile(contenttype.fileContentTypePathMap[filetype]["path"]+url,response);
      }
   }
});
/// ファイル読み取り関数
// function customReadFile(file_path, response){}と等価
const customReadFile = function(file_path, response){
   // ファイルが存在するかどうか
   if(fs.existsSync(file_path)){
      fs.readFile(file_path,function(error, data){
         if(error){
            sendErrorResponse(response);
            return;
         }else{
            response.write(data);
            response.end();
         }
      });
   }else{
      sendErrorResponse(response);
   }
}
/// エラーの関数
const sendErrorResponse = function(response){
   response.writeHead(404,{"content-type": "text/html"});
   response.write("<h1>Not Found</h1>");
   response.end();
}

// 9000番ポートで待ち受ける
app.listen(config.port);
console.log("サーバ起動" + 9000 + "　ポート監視中");
