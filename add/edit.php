<?php
class Edit{
  private $pdo;
  function __construct($pdo){
    $this->pdo=$pdo;
  }
  public function action(){
    if($_SERVER["REQUEST_METHOD"] === "POST"){
      $action=filter_input(INPUT_GET,"action");
      switch($action){
        case "register":
          $id=$this->register();
          echo json_encode($id);
          break;
        case "delete":
          $bool=$this->delete();
          echo json_encode($bool);
          break;
        case "update":
          $this->update();
          break;
        case "upload":
          $src=$this->upload();
          echo json_encode($src);
          break;
        case "imgDelete":
          $this->imgDelete();
          break;
      }
      //これ書かんと全部返ってくる
      exit;
    }
  }
  public function imgDelete(){
    $id=filter_input(INPUT_POST,"id");
    $image=filter_input(INPUT_POST,"image");
    $stmt=$this->pdo->query("UPDATE list SET $image=null WHERE id=$id");
  }
  public function upload(){
    $id=filter_input(INPUT_POST,"id");
    $imgList=array();
    for($i=1; $i<=3; $i++){
      if(!empty($_FILES["image$i"])){
        $name=$_FILES["image$i"]["name"];
        $tmpName=$_FILES["image$i"]["tmp_name"];
        move_uploaded_file($tmpName,"../add/$name");
        $this->pdo->query("UPDATE list SET image$i='../add/$name' WHERE id=$id");
        $imgList["image$i"]="../add/$name";
      }
    }
    return $imgList;
  }
  public function update(){
    $id=filter_input(INPUT_POST,"id");
    $title=filter_input(INPUT_POST,"title");
    $comment=filter_input(INPUT_POST,"comment");
    try{
      $stmt=$this->pdo->prepare("UPDATE list SET title=:title , comment=:comment WHERE id=$id");
      $stmt->bindValue("title",$title,\PDO::PARAM_STR);
      $stmt->bindValue("comment",$comment,\PDO::PARAM_STR);
      $stmt->execute();
    }catch(Exception $e){
      echo "補足した例外:",$e->getMessage(),"\n";
    }
  }
  public function delete(){
    try{
      $id=filter_input(INPUT_POST,"id");
      $stmt=$this->pdo->query("DELETE FROM list WHERE id=$id");
    }catch(Exception $e){
      echo "補足した例外:",$e->getMessage(),"\n";
      return false;
    }
    return true;
  }
  public function register(){
    $title=filter_input(INPUT_POST,"text");
    $stmt=$this->pdo->prepare("INSERT INTO list(title) VALUES(:text)");
    $stmt->bindValue("text",$title,\PDO::PARAM_STR);
    $stmt->execute();
    return $this->pdo->lastInsertId();
  }
  public function getData($id){
    $stmt=$this->pdo->query("SELECT * FROM list WHERE id=$id");
    return $stmt->fetch();
  }
  public function getDataList(){
    $stmt=$this->pdo->query("SELECT * FROM list");
    return $stmt->fetchAll();
  }
}
?>