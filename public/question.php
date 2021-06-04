<?php

$db = new mysqli();
if (mysqli_connect_errno()) {
  echo '0';

  exit;
}

$query = $db->query('SELECT value FROM info WHERE `key` = \'questionid\'');
echo json_encode($query->fetch_assoc()['value']);

$query->close();
$db->close();
