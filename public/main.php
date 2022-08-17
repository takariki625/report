<?php 
require("../add/data.php");
$data=new Data();
$pdo=$data->pdo();
$edit=new Edit($pdo);
$edit->action();
$id=filter_input(INPUT_GET,"id");
$upData=$edit->getData($id);
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>編集</title>
    <link rel="stylesheet" href="css/main.css">
  </head>
  <body>
    <header data-id=<?= $upData["id"]; ?>>
      <span id="titleSpan"><?= $data->hs($upData["title"]); ?></span>
      <span id="editBtn">編集</span>
    </header>
    <main>
      <span id="commentSpan"><?= $data->hs($upData["comment"]); ?></span>
    </main>
    <footer>
      <form>
        <?php for($i=1; $i<=3; $i++): ?>
          <?php if(empty($upData["image$i"])): ?>
            <label>+
              <input type="file" name="image<?= $i; ?>" accept="image/*">
            </label>
            <?php else: ?>
              <span id="img">
                <img src=<?= $upData["image$i"]; ?> name="image<?= $i; ?>" class="img">
              </span>
              <?php endif; ?>
              <?php endfor; ?>
        <span id="submitSpan">
          <span id="upload">upload</span>
        </span>
      </form>
      </footer>
    <script src="js/main.js"></script>
  </body>
</html>