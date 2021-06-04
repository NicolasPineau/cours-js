<?php

$data = json_decode($_POST['json'], TRUE);
$db = new mysqli();
if (mysqli_connect_errno()) {
  echo '0';

  exit;
}

$status = 1;
$query = $db->prepare('UPDATE answers SET state = ? WHERE userid = ? AND question = ?');
$query->bind_param('iss', $data['newStatus'], $data['userId'], $data['exerciseId']);
$query->execute();

$query->close();
$db->close();
