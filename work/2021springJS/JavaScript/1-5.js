//p140 lesson 39

let practice1 = document.getElementById('section01');
let practice2 = practice1.getElementsByClassName('blue');

practice2[0].innerHTML = 'みどり';

practice2[0].style.fontSize = '30px';
practice2[0].style.color = '#F00';

console.log(practice2[0].style.color);
