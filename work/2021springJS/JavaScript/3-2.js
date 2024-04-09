//p158 lesson 44
//残り文字数カウント

let element321 = document.getElementById('section03');
console.log(element321);
/* let element322 = element321.getElementById('form'); */
//「getElementById」もdocument直下でないと不可
let element323 = document.getElementById('textarea');

//最大文字数の取得
let maxTextNum = element323.getAttribute('maxlength'); //属性値を取得
//残り文字数表示要素追加
let textMessage = document.createElement('div');
textMessage.setAttribute('id','textMessage'); //属性と内容の設定
let element329 = document.getElementById('here32'); //位置調整のための変数
let element324 = element329.parentElement; //親要素の指定
element324.insertBefore(textMessage, element329);

element323.addEventListener('keyup', function() {
   //「keyup」キーを離したとき
   //「keydown」キーを押したとき
   //「keypress」キーを押し続けている間
   let currentTextNum = element323.value.length;
   textMessage.innerHTML = '<p>あと「' +
      (maxTextNum - currentTextNum) +
      '」文字入力できます。</p>';
   if(maxTextNum - currentTextNum == 0){
      textMessage.innerHTML = '<p>これ以上入力できません</p>';
   }
});

