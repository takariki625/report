<?php
$b=true; 
if($b){ 
  define("db","mysql:dbname=report;host=localhost");
  define("user","root");
  define("pw","");
}else{
  define("db","mysql:dbname=makun6250_report;host=mysql1.php.xdomain.ne.jp;");
  define("user","makun6250_php");
  define("pw","taka6250");
}
class data{
  private $pdo;
  function __construct(){
    $this->pdo=new PDO(db,user,pw);
  }
  public function pdo(){
    return $this->pdo;
  }
  public function hs($target){
    return htmlspecialchars($target,ENT_QUOTES,"UTF-8");
  }
}
require("edit.php");
?>