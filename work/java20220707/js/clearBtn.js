//連携
const clearBtns = document.getElementsByClassName('clearBtn');
const serachNameArea = document.getElementById('product-name-serach');
const serachArea = document.getElementsByClassName('input-column');

const names = serachNameArea.getElementsByTagName('input');
const input = serachArea[0].getElementsByTagName('input');
// const select = serachArea[0].getElementsByTagName('select');

// const maker = select[0].getElementsByTagName('option');
const maker = document.getElementById('makerDefault');
// const genre = select[1].getElementsByTagName('option');
const genre = document.getElementById('genreDefault');

// console.log('genre : '+genre);

clearBtns[0].addEventListener('click',()=>{
   //値を空文字にする
   names[0].value = ''; //name
   input[0].value = ''; //minPrice
   input[1].value = ''; //maxPrice
   for(let i=0;i<color.length;i++){
      color[i].selected = false; // female
   }
   maker.selected = true;
   genre.selected = true;
},false);
