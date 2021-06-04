<?php

$data = json_decode($_POST['json'], TRUE);
$db = new mysqli();
if (mysqli_connect_errno()) {
  echo '0';

  exit;
}

$query = $db->prepare('UPDATE answers SET username = ? WHERE userid = ?');
$query->bind_param('ss', $data['name'], $data['id']);
$query->execute();

$query = $db->prepare('INSERT IGNORE INTO users (userid, name, level) VALUES(?, ?, ?)');
$query->bind_param('ssi', $data['id'], $data['name'], $data['level']);
$query->execute();

$query = $db->prepare('UPDATE users SET level = ?, name = ? WHERE userid = ?');
$query->bind_param('iss', $data['level'], $data['name'], $data['id']);
$query->execute();

// print_r(mysqli_error($db));

$query->close();
$db->close();
