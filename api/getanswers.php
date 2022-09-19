<?php

include 'Db.php';

$db = Db::getInst();

if (isset($_GET['userId'])) {
  $rows = $db->fetchAll(
    'SELECT * FROM quiz_answers WHERE userid = :userId',
    ['userId' => $_GET['userId']]
  );

  echo json_encode($rows);
} else {
  return [];
}
