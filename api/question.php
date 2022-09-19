<?php

include 'Db.php';

$db = Db::getInst();

$query = $db->query(
  'SELECT value FROM info WHERE `key` = :key',
  ['key' => 'questionid']
);
echo json_encode($query->fetch()['value']);
