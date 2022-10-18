<?php

include 'Db.php';

$db = Db::getInst();

$data = json_decode($_POST['json'], TRUE);

if ($_GET['userKey'] === getenv('MASTER_KEY')) {
  $query = $db->execute(
    'UPDATE answers SET state = :state, message = :message WHERE userid = :userId AND question = :questionId',
    [
      'state' => $data['newStatus'],
      'message' => $data['newMessage'] ?? '',
      'userId' => $data['userId'],
      'questionId' => $data['exerciseId'],
    ]
  );
} elseif ($_GET['userKey'] === $data['userId']) {
  $query = $db->execute(
    'UPDATE answers SET state = :state WHERE userid = :userId AND question = :questionId',
    [
      'state' => $data['newStatus'],
      'userId' => $data['userId'],
      'questionId' => $data['exerciseId'],
    ]
  );
}
