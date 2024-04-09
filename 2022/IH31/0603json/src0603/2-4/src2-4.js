'use strict'; // 厳格に記述しないと動作しなくなる
// $('#insert_form').submit(function(e){
//    e.preventDefault(); // 動機通信のキャンセル
// });

// ボタンクリック後
$('#button').get(0).addEventListener('click',()=>{
   // チェックボックスの値を取得
   const hobby = new Array(0);
   for(let i=0; i<$('input[name="hobby"]').length; i++){
   //   hobby[i] = document.getElementsByName('hobby')[i].checked;
      if($('input[name="hobby"]')[i].checked) hobby.push(document.getElementsByName("hobby")[i].value); //shift,unshift,pop,push
   }
   /* 
   for(let i=0; i<$('input[name="hobby"]:checked').length; i++){
      hobby.push(i); //shift,unshift,pop,push
   }
    */
   /* 
   $('input[name="hobby"]:checked').each(function () {
      if($('input[name="hobby"]').checked) hobby.push($('input[name="hobby"].val()'));
   });
    */
   console.log($('input[name="hobby"]')[0].value);

   const gender = new Array(0);
   for(let i=0; i<$('input[name="hobby"]:checked').length; i++){
      if($('input[name="gender"]')[i].checked) gender.push(document.getElementsByName("gender")[i].value);
   }

   // 配列作成
   const array = {
      ID : $('input[name="id"]').val(),
      name : $('input[name="name"]').val(),
      gender : gender,
      hobby : hobby,
      mobilephone : $('[name="mobilephone"]').val(),
      food : $('[name="food"]').val()
   };

   const str_array = getValue(array);
//   console.log(array);
//   console.log(str_array);

   // JSON文字列に変換
   const send_data = JSON.stringify(array);

   // PHPに非同期通信で送信
   $.ajax({
      type: "POST",
      url: "./src2-4.php",
      data: send_data
   }).done(function(msg, status, xhr){
      console.log("SUCCESS");
      console.log("msg=" + msg);
      console.log("status=" + status);
      console.log("xhr=" + xhr);
      // 配列の中身を書き出し
      $('#output1').append(send_data);
      $('#output2').append(msg);
      for(let key in array){ // 拡張forらしきもの
         $('#output3').append("キー：" + key + "　値：" + array[key] + "<br>");
      }
   }).fail(function(xhr){
      console.log("ERROR");
   }).always(function(xhr){
      console.log("FIN");
   });

},false);

// 複雑な配列を一次元化する関数
function getValue(obj){
   if(typeof obj === 'object'){
      let strValue = '';
      for(let key in obj){
         // 再帰呼び出し
         strValue += getValue(obj[key]);
      }
      return strValue;
   }else{
      return obj + "<br>";
   }
}
