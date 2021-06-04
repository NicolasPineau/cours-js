<?php

$data = json_decode($_POST['json'], true);
$db = new mysqli();
if (mysqli_connect_errno()) {
  echo '0';

  exit;
}

$status = '0';
$query = $db->prepare('REPLACE INTO answers(username, userid, question, answer, state) VALUES (?, ?, ?, ?, ?)');
$query->bind_param('ssssi', $data['userName'], $data['userId'], $data['exerciseId'], $data['code'], $status);
$query->execute();

$query->close();
$db->close();
