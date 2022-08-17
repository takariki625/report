<?php 
require("../add/data.php");
$data=new Data();
$pdo=$data->pdo();
$edit=new Edit($pdo);
$edit->action();
$dataList=$edit->getDataList();
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>タグページ</title>
  <link rel="stylesheet" href="css/index.css">
</head>
<body>
  <header>
    <form id="registerForm">
      <input type="text">
      <input type="submit" value="登録">
    </form>
  </header>
  <main>
    <ul>
      <?php foreach($dataList as $list): ?>
        <li data-id=<?= $list["id"]; ?>>
          <?= $data->hs($list["title"]); ?>
          <span>x</span>
        </li>
      <?php endforeach; ?>
    </ul>
  </main>
  <script src="js/index.js"></script>
</body>
</html>
