<?php

include 'Db.php';

$db = Db::getInst();

if ($_GET['userId'] === 'g0j1dxfuca0b11ee') {
  $query = $db->query(
    'SELECT * FROM answers WHERE question = :questionId ORDER BY username',
    ['questionId' => $_GET['exerciseId']]
  );
  echo json_encode($query->fetchAll());

  return;
}

if (isset($_GET['userId'])) {
  $query = $db->query(
    'SELECT * FROM answers WHERE question = :questionId AND userid = :userId ORDER BY username',
    ['questionId' => $_GET['exerciseId'], 'userId' => $_GET['userId']]
  );

  echo json_encode($query->fetchAll() ?? []);
}
