<?php

$db = new mysqli();
if (mysqli_connect_errno()) {
  echo '0';

  exit;
}

if ($_GET['userId'] === 'g0j1dxfuca0b11ee') {
  $query = $db->query(sprintf(
    'SELECT * FROM answers WHERE question = %u ORDER BY username',
    $_GET['exerciseId'],
  ));
  echo json_encode($query->fetch_all(MYSQLI_ASSOC));

  return;
}

if (isset($_GET['userId'])) {
  $query = $db->query(sprintf(
    'SELECT * FROM answers WHERE question = %u AND userid = \'%s\' ORDER BY username',
    $_GET['exerciseId'],
    mysqli_escape_string($db, $_GET['userId'])
  ));

  echo json_encode($query->fetch_assoc() ?? []);
} elseif ($isMaster) {
  return [];
}

$query->close();
$db->close();
