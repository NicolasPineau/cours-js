<?php

include 'Db.php';

$db = Db::getInst();

$data = json_decode($_POST['json'], TRUE);

$query = $db->query(
  'UPDATE answers SET username = :userName WHERE userid = :userId',
  ['userName' => $data['name'], 'userId' => $data['id']]
)->execute();

$query = $db->query(
  'INSERT IGNORE INTO users (userid, name, level) VALUES(:userId, :userName, :level)',
  ['userId' => $data['id'], 'userName' => $data['name'], 'level' => $data['level']]
)->execute();

$query = $db->query(
  'UPDATE users SET level = :level, name = :userName WHERE userid = :userId',
  ['level' => $data['level'], 'userName' => $data['name'], 'userId' =>  $data['id']]
)->execute();
