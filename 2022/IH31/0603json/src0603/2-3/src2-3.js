'use strict'; // 厳格に記述しないと動作しなくなる

// ボタンクリック後
$('#button').get(0).addEventListener('click',()=>{
   // 連想配列作成
   const array = {};
   array.ID = $('input[name="ID"]').val();
   array.name = $('input[name="name"]').val();
   array.gender = $('input[name="gender"]').val();

   // JSON文字列に変換
   const send_data = JSON.stringify(array);

   // PHPに非同期通信で送信
   $.ajax({
      type: "POST",
      url: "./src2-3.php",
      data: {
         value : send_data
      }
   }).done(function(msg, status, xhr){
      console.log("SUCCESS");
      console.log("msg=" + msg);
      console.log("status=" + status);
      console.log("xhr=" + xhr);
      $('#output2').append(msg);
      // JSON文字列を受け取り
      //const php_return = JSON.parse(msg);
      //$('#output2').append(php_return);
   }).fail(function(xhr){
      console.log("ERROR");
   }).always(function(xhr){
      console.log("FIN");
   });

   // 配列の中身を書き出し
   $('#output1').append(send_data);
   for(let key in array){ // 拡張forらしきもの
      $('#output3').append("キー：" + key + "　値：" + array[key] + "<br>");
   }

},false);
