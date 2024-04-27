<?php
/* -=-=-=-=-= INSERT文 =-=-=-=-=- */

function sqlInsertText($table,$column,$array){
   $sqlText = "INSERT INTO ".$table." (";
   //列名の追記
   $plusArray = implode(", ",$column);
   $sqlText = $sqlText.$plusArray.") VALUE(";
   //値の追記（一次元配列）
   foreach($array as $value){
      //数値とNULLはシングルクォーテーションいらない
      if(is_numeric($value) || $value == 'NULL') $sqlText .= $value . ", ";
      else $sqlText .= "'" . $value . "', ";
   }
   $sqlText = substr($sqlText,0,-2); //最後の「, 」を削除 = rtim($sqlText,', ')
   $sqlText .= ")";
   return $sqlText;
}

//挿入
function sqlInsert($sqlText){
   $link = @mysqli_connect( HOST , USER_ID , PASSWORD , DB_NAME);
   if($link == false) return 'DBerror'; //$sqlMsg = 'DB接続エラー';
   mysqli_set_charset($link,'utf8');

   $TorF = mysqli_query($link,$sqlText);
   $id = mysqli_insert_id($link);

   mysqli_close($link);

   if(!$TorF) return 'error'; //$sqlMsg = 'INSERT失敗';
   return $id;
}


/* -=-=-=-=-= SELECT文 =-=-=-=-=- */

function sqlSelectText($table){
   $sqlText = "SELECT * FROM ".$table;
   //return
   return $sqlText;
}

function sqlSelectTextPlus($plusArray){
   //検索
   //$plusArray = ['where','id','=',5,]
   //$plusArray = ['where','id','like','山',]
   //$plusArray = ['where','id','like','%山%',]
   if($plusArray[0] == 'WHERE' || $plusArray[0] == 'AND'){
      //数値とNULLはシングルクォーテーションいらない
      if(is_numeric($plusArray[3]) || $plusArray[3] == 'NULL') $sqlText = " ".$plusArray[0]." ".$plusArray[1]." ".$plusArray[2]." ".$plusArray[3];
      else $sqlText = " ".$plusArray[0]." ".$plusArray[1]." ".$plusArray[2]." '".$plusArray[3]."'";
   }
   //並び替え
   //$plusArray = ['orderBy','id','ASC',]
   //$plusArray = ['orderBy','id','DESC',]
   elseif($plusArray[0] == 'ORDER BY' || $plusArray[0] == ','){
      $sqlText = "";
      foreach($plusArray as $value){
         $sqlText .= " ".$value;
      }
   }
   //$plusArray[0]が間違えている
   else return false;
   //return
   return $sqlText;
}

//INSERT文実行
function sqlSelect($sqlText){
   $link = @mysqli_connect( HOST , USER_ID , PASSWORD , DB_NAME);
   if($link == false) return 'DBerror'; //$sqlMsg = 'DB接続エラー';
   mysqli_set_charset($link,'utf8');

   $result = mysqli_query($link,$sqlText);
   while($row = mysqli_fetch_assoc($result)){
      $array[] = $row;
   }

   mysqli_close($link);

   if(empty($array)) return 0; //該当データが０件の場合
   //２次元配列で返す
   return $array;
}


/* -=-=-=-=-= UPDATE文 =-=-=-=-=- */
function sqlUpdateText($table,$column,$array,$row,$value){
   $sqlText = "UPDATE " . $table . " SET ";
   if(count($column) != count($array)) return 'NotMatch'; //列名と値の数が不一致
   for ($i=0; $i < count($column); $i++) {
      //数値とNULLはシングルクォーテーションいらない
      if(is_numeric($array[$i]) || $array[$i] == 'NULL') $sqlText .= $column[$i] . " = " . $array[$i] . ", ";
      else $sqlText .= $column[$i] . " = '" . $array[$i] . "', ";
   }
   $sqlText = substr($sqlText,0,-2); //最後の「, 」を削除 = rtim($sqlText,', ')
   $sqlText .= " WHERE " . $row . " = " . $value;

   return $sqlText;
}

//変更
function sqlUpdate($sqlText){
   $link = @mysqli_connect( HOST , USER_ID , PASSWORD , DB_NAME);
   if($link == false) return 'DBerror'; //$sqlMsg = 'DB接続エラー';
   mysqli_set_charset($link,'utf8');

   $TorF = mysqli_query($link,$sqlText);

   mysqli_close($link);

   if(!$TorF) return 'error'; //$sqlMsg = 'UPDATE失敗';
   return 'OK';
}

/* -=-=-=-=-= DELETE文 =-=-=-=-=- */
//あいまい検索削除
function sqlDeleteLike($table,$name){
   $link = @mysqli_connect( HOST , USER_ID , PASSWORD , DB_NAME);
   if($link == false) return false; //$sqlMsg = 'DB接続エラー';
   mysqli_set_charset($link,'utf8');

   $TorF = mysqli_query($link,"DELETE * FROM ".$table." WHERE name LIKE '%".$name."%'");

   mysqli_close($link);

   if(!$TorF) return false; //$sqlMsg = 'DELETE失敗';
   return true;
}
?>