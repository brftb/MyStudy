<?php
//日付の存在確認「checkdate」の強化版
function checkdateSP($year,$month,$day){
   //year
   if($year < 1 || 32767 < $year) return '※対応した年ではありません。';
   //month
   if($month < 1 || 12 < $month) return '※月が不適切です。';
   //day
   $maxDay = [31,28,31,30,31,30,31,31,30,31,30,31];
   if($year % 4 == 0 && $year % 100 != 0) $maxDay[1] = 29; //うるう
   if($year % 400 == 0) $maxDay[1] = 28; //うるわない
   if($day < 1 || $maxDay[$month - 1] < $day) return '※日が不適切です。';
   return 'OK';
}

//配列が空かどうかチェック
function emptyArray($array){
   foreach($array as $key => $value){
      if(empty($value)){
         unset($array[$key]);
      }
   }
   if(empty($array)) return true;
   return false;
}

//入力値チェック
//2次元配列を受け取る
/*
$preData = [
   [$_POST['name'],['empty']],
   [$_POST['age'],['empty','isnumeric']],
   [$_POST['title'],['empty','isnumeric']],
   [$_POST['release_date'],['empty','isnumeric','strlen,=,8','date']],
   [$_POST['purchase_date'],['empty','isnumeric','strlen,=,8']]
];
$error_msg['name'] = inputCheck($preData[0]);
$error_msg['age'] = inputCheck($preData[1]);
$error_msg['title'] = inputCheck($preData[2]);
$error_msg['release_date'] = inputCheck($preData[3]);
$error_msg['purchase_date'] = inputCheck($preData[4]);
*/
function inputCheck($data){
   //エラーメッセージ
   foreach($data[1] as $key => $value){
      //空
      if($value == 'empty') if($data[0] == '') return '※入力が確認できません。';
      //数値
      if($value == 'isnumeric') if(!is_numeric($data[0])) return '※入力できるのは数値のみです。';
      //数
      if(strpos($value,'figure') !== false){
         //配列にする
         $list = explode(',',$value);
         switch($list[1]){
            case '<': if(($data[0]) >= $list[2]) return '※'.$list[2].'未満の数を入力してください。'; break;
            case '<=': if(($data[0]) > $list[2]) return '※'.$list[2].'以下の数を入力してください。'; break;
            case '=': if(($data[0]) != $list[2]) return '※'.$list[2].'になるように入力してください。'; break;
            case '>=': if(($data[0]) < $list[2]) return '※'.$list[2].'以上の数を入力してください。'; break;
            case '>': if(($data[0]) <= $list[2]) return '※'.$list[2].'より大きい数を入力してください。';
         }
      }
      //整数
      if($value == 'integer') if(strpos($data[0],'.') !== false) return '※入力できるのは整数のみです。';
      //桁数
      if(strpos($value,'strlen') !== false){
         //配列にする
         $list = explode(',',$value);
         switch($list[1]){
            case '<': if(strlen($data[0]) >= $list[2]) return '※'.$list[2].'桁未満で入力してください。'; break;
            case '<=': if(strlen($data[0]) > $list[2]) return '※'.$list[2].'桁以下で入力してください。'; break;
            case '=': if(strlen($data[0]) != $list[2]) return '※'.$list[2].'桁で入力してください。'; break;
            case '>=': if(strlen($data[0]) < $list[2]) return '※'.$list[2].'桁以上で入力してください。'; break;
            case '>': if(strlen($data[0]) <= $list[2]) return '※'.$list[2].'桁超過で入力してください。';
         }
      }
      //時間チェック
      if($value == 'date'){
         $year = substr($data[0],0,4);
         $month = substr($data[0],4,2);
         $day = substr($data[0],6,2);
         if(strtotime('now') < strtotime($year.$month.$day)) return '※未来の日付は登録できません。';
         /* if(!checkdate($month,$day,$year)) return 'グレゴリオ暦において不適切です。'; */
         if(checkdateSP($year,$month,$day) != 'OK') return checkdateSP($year,$month,$day);
      }
   }
   return '';
}


//8桁の数字をハイフン区切りにする(date型)
function dateHyphen($num){
   $year = substr($num,0,4);
   $month = substr($num,4,2);
   $day = substr($num,6,2);
   return $year.'-'.$month.'-'.$day;
}
?>