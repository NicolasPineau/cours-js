<?php

include 'Db.php';

$db = Db::getInst();

$data = json_decode($_POST['json'], true);

$status = '0';
$db->query(
  'REPLACE INTO answers(username, userid, question, answer, state) VALUES (:userName, :userId, :questionId, :answer, :state)',
  [
    'userName' => $data['userName'],
    'userId' => $data['userId'],
    'questionId' => $data['exerciseId'],
    'answer' => $data['code'],
    'state' => $status,
  ]
)->execute();
