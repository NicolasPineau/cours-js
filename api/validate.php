<?php

include 'Db.php';

$db = Db::getInst();

$data = json_decode($_POST['json'], TRUE);

$status = 1;
$query = $db->execute(
  'UPDATE answers SET state = :state WHERE userid = :userId AND question = :questionId',
  ['state' => $data['newStatus'], 'userId' => $data['userId'], 'questionId' => $data['exerciseId']]
);
