//p138 lesson 38
//HTMLの書き換え

//idから取得して中身を変更
let element1 = document.getElementById('section01');

//tagから取得して中身を変更
let element2 = element1.getElementsByTagName('h3');
element2[0].innerHTML = 'ぱぴ';

//classから取得して中身を変更(今回は無視)
let element3 = document.getElementsByClassName('item');
element3.innerHTML = '<h1>HELLO</h1>';

