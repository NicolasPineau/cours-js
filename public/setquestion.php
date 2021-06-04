<?php

if ($_GET['userId'] !== 'g0j1dxfuca0b11ee') {
  exit;
}

$questionId = (int) $_GET['questionId'];
$db = new mysqli();
if (mysqli_connect_errno()) {
  echo '0';

  exit;
}

$key = 'questionid';
$query = $db->prepare('REPLACE INTO info(`key`, value) VALUES (?, ?)');
$query->bind_param('ss', $key, $questionId);
$query->execute();

$query->close();
$db->close();
