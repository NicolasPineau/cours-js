<?php

include 'Db.php';

$db = Db::getInst();

$row = $db->fetch(
  'SELECT value FROM info WHERE `key` = :key',
  ['key' => 'questionid']
);
echo json_encode($row['value'] ?? '');
