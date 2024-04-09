//p163 lesson 45
//タイマー

let element331 = document.getElementById('section03');
/* let timer = setInterval(tumerfunc, 200); //200ms間隔で関数を呼び出す */
/* clearInterval(timer); */

//残り時間(s)
let remainingTime = 10;
// console.log(remainingTime);

//残り文字数表示要素追加
let timeMessage = document.createElement('div');
timeMessage.setAttribute('id','timeMessage'); //属性と内容の設定
element324.insertBefore(timeMessage, textMessage);

element33[0].addEventListener('click', function() {
   let timerID = setInterval(function() {
      timeMessage.innerHTML = '<p>残り時間：' + remainingTime + '秒</p>';

      if(remainingTime < -5){
         alert('時間いっぱいです');
         clearInterval(timerID);
      }

      remainingTime--; //変数を減らす
   }, 1000);
});

