<?php

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* -=-=-=-=-= SELECT文 =-=-=-=-=- */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

//$allArray = stmtSelect(TABLE,['*'],[['LIMIT',5,5]]);
function stmtSelect($table,$columnArray=['*'],$plusArrayArray=null,$output=false){
   //PDOインスタンス化
   $db = new PDO('mysql:dbname='.DB_NAME.';host='.HOST.';charset=utf8',USER_ID,PASSWORD);
   //エラー表示
   $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);

   //条件
   if($plusArrayArray !== null){
      $terms = termsText($plusArrayArray);
   }else $terms = '';

   //配列を文字列にする。(シングルクォートのせいでSQL文がおかしくなるので、先に変数に文を格納した。)
   $column = implode(',',$columnArray);

   //雛形作成
   $stmt = $db->prepare("SELECT ".$column." FROM ".$table.$terms);

   //SQL文の出力
   if($output){
      return $stmt->debugDumpParams();
   }

   //実行
   $stmt->execute();

   while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      $array[] = $row;
   }

   //デストラクタ
   $db = null;

   if(empty($array)) return 0; //該当データが０件の場合

   //２次元配列で返す
   return $array;
}


//条件のメソッド
function termsText($plusArrayArray){
   $text = '';
   foreach($plusArrayArray as $plusArray){
      //検索
      //$plusArray = ['WHERE','id','=',5,]
      //$plusArray = ['WHERE','id','like','山',]
      //$plusArray = ['AND','id','like','%山%',]
      if($plusArray[0] == 'WHERE' || $plusArray[0] == 'AND'){
         //数値とNULLはシングルクォーテーションいらない
         if(is_numeric($plusArray[3]) || $plusArray[3] == 'NULL') $text .= " ".$plusArray[0]." ".$plusArray[1]." ".$plusArray[2]." ".$plusArray[3];
         else $text .= " ".$plusArray[0]." ".$plusArray[1]." ".$plusArray[2]." '".$plusArray[3]."'";
      }
      //並び替え
      //$plusArray = ['ORDER BY','id','ASC']
      //$plusArray = ['ORDER BY','id','DESC']
      elseif($plusArray[0] == 'ORDER BY' || $plusArray[0] == ','){
         foreach($plusArray as $value){
            $text .= " ".$value;
         }
      }
      //絞り込み
      //$plusArray = ['LIMIT',5,5]
      elseif($plusArray[0] == 'LIMIT'){
         $text .= " LIMIT $plusArray[1],$plusArray[2]";
      }
      //結合
      //$plusArray = ['LIMIT',t_point,p,s.id,p.student_id]
      elseif($plusArray[0] == 'INNER JOIN'){
         $text .= " INNER JOIN $plusArray[1] AS $plusArray[2] ON $plusArray[3] = $plusArray[4]";
      }
      //$plusArray[0]が間違えている
      else return false;
   }

   return $text;
}


/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* -=-=-=-=-= INSERT文 =-=-=-=-=- */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

function smtmInsert($table,$columnArray,$dataArray){
   //PDOインスタンス化
   $db = new PDO('mysql:dbname='.DB_NAME.';host='.HOST.';charset=utf8',USER_ID,PASSWORD);
   //エラー表示
   $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);

   //配列を文字列にする。(シングルクォートのせいでSQL文がおかしくなるので、先に変数に文を格納した。)
   $column = implode(',',$columnArray);

   //値の追記（一次元配列）
   $value = '';
   foreach($dataArray as $data){
      //数値とNULLはシングルクォーテーションいらない
      if(is_numeric($data) || $data == 'NULL') $value .= $data . ", ";
      else $value .= "'" . $data . "', ";
   }
   $value = substr($value,0,-2); //最後の「, 」を削除 = rtim($sqlText,', ')

   //雛形作成
   $stmt = $db->prepare("INSERT INTO ".$table." (".$column.") VALUES(".$value.")");

   //実行
   $stmt->execute();

   //デストラクタ
   $db = null;
}



/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* -=-=-=-=-= UPDATE文 =-=-=-=-=- */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

function stmtUpdateText($table,$column,$array,$row,$value){
   $sqlText = "UPDATE " . $table . " SET ";
   if(count($column) != count($array)) return 'NotMatch'; //列名と値の数が不一致
   for ($i=0; $i < count($column); $i++) {
      $link = @mysqli_connect( HOST , USER_ID , PASSWORD , DB_NAME); //サニタイズ用
      $array[$i] = mysqli_real_escape_string($link,$array[$i]); //サニタイズ
      mysqli_close($link); //サニタイズ用
      //数値とNULLはシングルクォーテーションいらない
      if(is_numeric($array[$i]) || $array[$i] == 'NULL') $sqlText .= $column[$i] . " = " . $array[$i] . ", ";
      else $sqlText .= $column[$i] . " = '" . $array[$i] . "', ";
   }
   $sqlText = substr($sqlText,0,-2); //最後の「, 」を削除 = rtim($sqlText,', ')
   $sqlText .= " WHERE " . $row . " = " . $value;

   return $sqlText;
}

//変更
function stmtUpdate($sqlText){
   $link = @mysqli_connect( HOST , USER_ID , PASSWORD , DB_NAME);
   if($link == false) return 'DBerror'; //$sqlMsg = 'DB接続エラー';
   mysqli_set_charset($link,'utf8');

   $TorF = mysqli_query($link,$sqlText);

   mysqli_close($link);

   if(!$TorF) return 'error'; //$sqlMsg = 'UPDATE失敗';
   return 'OK';
}



/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/* -=-=-=-=-= DELETE文 =-=-=-=-=- */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

//あいまい検索削除
//基本SELECTと同じ
function stmtDelete($table,$plusArrayArray){
   //PDOインスタンス化
   $db = new PDO('mysql:dbname='.DB_NAME.';host='.HOST.';charset=utf8',USER_ID,PASSWORD);
   //エラー表示
   $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_WARNING);

   //条件
   if($plusArrayArray !== null){
      $terms = termsText($plusArrayArray);
   }else return '全て削除は未実装';

/* 
   //削除件数のカウント
   //雛形作成
   $stmt = $db->prepare("SELECT count(*) FROM ".$table.$terms);
   //実行
   $stmt->execute();
   //結果
   $resultArray = $stmt->fetch(PDO::FETCH_ASSOC);
 */

    //該当データが０件の場合
   //if(empty($result)) return '0';

/* 
   //削除実行
   //雛形作成
   $stmt = $db->prepare("DELETE FROM ".$table.$terms);
   //実行
   $stmt->execute();
 */
   //デストラクタ
   $db = null;

   //削除完了
   //return $resultArray["count(*)"]; //削除件数をString型で返す
   return true;
}

?>