<?php
if($_SERVER["REQUEST_METHOD"] != "POST"){
   // POST以外
   get_pro();
}else{
   // POST
   post_pro();
}

//// 関数型
function get_pro(){
   $value = $_GET;
   //// 何件か
   $num = $value['number'];
   // リクエストに値がない場合
   if(is_null($num)){
      $num = 1;
   }
   // 範囲外
   if($num<1){
      http_response_code(400);
      echo "範囲外です。";
      exit;
   }
   // CSVを１行ずつ取得し配列化する
   $filepath = './enquete.csv';
   $allRecodes = array_from_csv($filepath);
   // 範囲外
   if(count($allRecodes) < $num){
      http_response_code(400);
      echo "範囲外です。";
      exit;
   }
   for($i=0; $i<$num; $i++){
      $recodes[] = $allRecodes[$i];
   }
   /* 
   $i = 0;
   if(($handle = fopen($filepath, "r") !== false)){
      while(($line = fgetcsv($handle, 0, ",")) !== false){
         if($i < $num){
            foreach($line as $key => $data){
               $data_substance = explode("=", $data);
               $array[$data_substance[0]] = $data_substance[1];
            }
            $recodes[] = $array;
            $i++;
         }else{
            break;
         }
      }
      fclose($handle);
   }
    */
   http_response_code(200);
   echo json_encode($recodes);
}

function post_pro(){
   $value = file_get_contents("php://input");
   $data = json_decode($value);
   ?>value = <pre><?php var_dump($value); ?></pre><?php
   //// 受け取った配列をcsvに格納
   $file = './enquete.csv';
   $current = file_get_contents($file);
   // 複雑な配列を一括implode
   foreach($data as $key => $value){
      if(is_array($value)){
         $string = '';
         foreach($value as $details){
            $string .= $details;
         }
         $current .= $key."=".$string.",";
      }else{
         $current .= $key."=".$value.",";
      }
   }
   $current = rtrim($current, ',');
   $current .= "\n";

   file_put_contents($file,$current);

   http_response_code(200);
   // JSON文字列に変換してjsで受け取るためにecho
   echo json_encode($data);

   // postmanのbodyに記述
   // ID=12345,name=はるのたろう,gender=women,hobby=34,mobilephone=3,food=234
   // {"ID":"12345","name":"\u306f\u308b\u306e\u305f\u308d\u3046","gender":["men"],"hobby":["3","4"],"mobilephone":"3","food":["2","3","4"]}
}


//----------~----------~----------~----------1208「,」区切りcsvから２次元配列に格納----------~----------~----------~----------
function array_from_csv($csv_file){
   $fp = fopen($csv_file,'r');
   $list = [];                           //空配列を用意
   while($value = fgets($fp)){           //一行ずつ取り出す
      $list[] = explode(',',$value);     //配列に格納
   }
   fclose($fp);
   return $list;
}
?>