<?php

if ($_GET['userId'] !== 'g0j1dxfuca0b11ee') {
  exit;
}

include 'Db.php';

$db = Db::getInst();

$questionId = (int) $_GET['questionId'];

$key = 'questionid';
$db->query(
  'REPLACE INTO info(`key`, value) VALUES (:key, :questionId)',
  ['key' => $key, 'questionId' => $questionId]
)->execute();
