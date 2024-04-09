//連携
const userId = document.getElementById('id');
const userName = document.getElementById('name');
const password = document.getElementById('password');
const gender = document.getElementsByClassName('gender');
const year = document.getElementById('year');
const month = document.getElementById('month');
const day = document.getElementById('day');
const btn = document.getElementById('uesrVerifyBtn');
const dayErrorPlace = document.getElementById('dayErrorPlace');


//エラー処理
//DOMの読み込みが終了したら行うイベントリスナー
window.addEventListener('DOMContentLoaded',function(){

$(function(){
   /* 
   id名：form
   メソッド名：validate()
   引数(オブジェクト)：rules:{},message:{}
    */
   $('#form-5').validate({
   /* ---------------------------------------- */
      //エラー判定
      rules:{
         //name属性
         id:{
            required:true,
            maxlength:10
         },
         name:{
            required:true,
            maxlength:20
         },
         password:{
            required:true,
            rangelength:[6,10]
         },
         gender:{
            required:true
         },
         year:{
            required:true,
            number: true,
            range:[1880,2030]
         },
         month:{
            required:true,
            number: true,
            range:[1,12]
         },
         day:{
            required:true,
            number: true
         }
      },
   /* ---------------------------------------- */
      //エラーメッセージ
      messages:{
         //name属性
         id:{
            required:"必須項目",
            maxlength:"10桁以内で入力してください"
         },
         name:{
            required:"必須項目",
            maxlength:"20桁以内で入力してください"
         },
         password:{
            required:"必須項目",
            rangelength:"6〜10文字にしてください"
         },
         gender:{
            required:"必須項目",
         },
         year:{
            required:"必須項目",
            number: "数字のみ入力出来ます",
            range: "1880~2030の範囲内"
         },
         month:{
            required:"必須項目",
            number: "数字のみ入力出来ます",
            range: "1~12の範囲内"
         },
         day:{
            required:"必須項目",
            number: "数字のみ入力出来ます"
         }
      },
   /* ---------------------------------------- */
      //エラーメッセージの表示場所指定
      errorPlacement:function(error,element){
         error.appendTo(element.data('error_placement'));
      }
   });
});

});


// グレゴリオ暦計算
function checkDate(){
   let maxDay = 31;
   if(month.value==4 || month.value==6 || month.value==9 || month.value==11){
      maxDay = 30;
   }
   else if(month.value == 2){
      maxDay = 28;
      if(year.value%4 == 0){
         maxDay = 29;
      }
      if(year.value%100 == 0){
         maxDay = 28;
      }
      if(year.value%400 == 0){
         maxDay = 29;
      }
   }
   if(day.value > maxDay){
      dayErrorPlace.innerText = "実在しない日付";
   }else{
      dayErrorPlace.innerText = "";
   }
}
year.addEventListener('input',(e)=>{
   checkDate();
},false);
month.addEventListener('input',(e)=>{
   checkDate();
},false);
day.addEventListener('input',(e)=>{
   checkDate();
},false);


// 値が入力されるまでボタンは非活性
btn.disabled=true;
btn.style.cursor = 'not-allowed';
btn.style.opacity = .5;

function btnDisable(){
   if(dayErrorPlace.innerText==''){
      btn.disabled=false;
      btn.style.cursor = 'pointer';
      btn.style.opacity = 1;
   }else{
      btn.disabled=true;
      btn.style.cursor = 'not-allowed';
      btn.style.opacity = .5;
   }
}
year.addEventListener('input',()=>{btnDisable();},false);
month.addEventListener('input',(e)=>{btnDisable();},false);
day.addEventListener('input',(e)=>{btnDisable();},false);
password.addEventListener('input',(e)=>{btnDisable();},false);
