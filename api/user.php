<?php

include 'Db.php';

$db = Db::getInst();

$data = json_decode($_POST['json'], TRUE);

$query = $db->execute(
  'UPDATE answers SET username = :userName WHERE userid = :userId',
  ['userName' => $data['name'], 'userId' => $data['id']]
);

$query = $db->execute(
  'INSERT IGNORE INTO users (userid, name, level) VALUES(:userId, :userName, :level)',
  ['userId' => $data['id'], 'userName' => $data['name'], 'level' => $data['level'] ?? 0]
);

$query = $db->execute(
  'UPDATE users SET level = :level, name = :userName WHERE userid = :userId',
  ['level' => $data['level'] ?? 0, 'userName' => $data['name'], 'userId' =>  $data['id']]
);
