<?php

if ($_GET['userId'] !== getenv('MASTER_KEY')) {
  exit;
}

include 'Db.php';

$db = Db::getInst();

$questionId = (int) $_GET['questionId'];

$key = 'questionid';
$db->execute(
  'REPLACE INTO info(`key`, value) VALUES (:key, :questionId)',
  ['key' => $key, 'questionId' => $questionId]
);
