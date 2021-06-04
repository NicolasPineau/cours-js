<?php

$db = new mysqli();
if (mysqli_connect_errno()) {
  echo '0';

  exit;
}

if (isset($_GET['userId'])) {
  $query = $db->query(sprintf(
    'SELECT * FROM quiz_answers WHERE userid = \'%s\'',
    mysqli_escape_string($db, $_GET['userId'])
  ));

  echo json_encode($query->fetch_all(MYSQLI_ASSOC) ?? []);
} else {
  return [];
}

$query->close();
$db->close();
