<?php

include 'Db.php';

$db = Db::getInst();

$data = json_decode($_POST['json'], TRUE);

$status = 1;
$query = $db->execute(
  'UPDATE answers SET state = :state, message = :message WHERE userid = :userId AND question = :questionId',
  [
    'state' => $data['newStatus'],
    'message' => $data['newMessage'] ?? '',
    'userId' => $data['userId'],
    'questionId' => $data['exerciseId'],
  ]
);
