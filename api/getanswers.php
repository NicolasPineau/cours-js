<?php

include 'Db.php';

$db = Db::getInst();

if (isset($_GET['userId'])) {
  $query = $db->query(
    'SELECT * FROM quiz_answers WHERE userid = :userId',
    ['userId' => $_GET['userId']]
  );

  echo json_encode($query->fetchAll() ?? []);
} else {
  return [];
}
