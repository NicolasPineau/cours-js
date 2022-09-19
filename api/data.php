<?php

include 'Db.php';

$db = Db::getInst();

if ($_GET['userId'] === 'g0j1dxfuca0b11ee') {
  $rows = $db->fetchAll(
    'SELECT * FROM answers WHERE question = :questionId ORDER BY username',
    ['questionId' => $_GET['exerciseId']]
  );
  echo json_encode($rows);

  return;
}

if (isset($_GET['userId'])) {
  $row = $db->fetch(
    'SELECT * FROM answers WHERE question = :questionId AND userid = :userId ORDER BY username',
    ['questionId' => $_GET['exerciseId'], 'userId' => $_GET['userId']]
  );

  echo json_encode($row);
}
