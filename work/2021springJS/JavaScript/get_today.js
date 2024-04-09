today = new Date();                             //日付オブジェクトを作成
myForm = document.getElementById("form1");      //document.form1について以下の処理を行う
with(myForm){
   text1.value = today.getFullYear();
   text2.value = today.getMonth() + 1;
   text3.value = today.getDate();
   text4.value = today.getHours();
   text5.value = today.getMinutes();
   text6.value = today.getSeconds();
}
kaisuu = 0;
function counter(obj){
   kaisuu ++;
   obj.value=" " + kaisuu + " ";
}
