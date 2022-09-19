<?php

include 'Db.php';

$db = Db::getInst();

$data = json_decode($_POST['json'], true);

$query = $db->query(
  'REPLACE INTO quiz_answers(userid, questionid, answer) VALUES (:userId, :questionId, :answer)',
  [
    'userId' => $data['userId'],
    'questionId' => $data['questionId'],
    'answer' => $data['answer'],
  ]
);
$query->execute();

$goodAnswers = [
  1 => 1,
  2 => 2,
  3 => 0,
  4 => 2,
  5 => 0,
  6 => 3,
  7 => 0,
  8 => 1,
  9 => 1,
  10 => 3,
  11 => 2,
  12 => 1,
  13 => 1,
  14 => 0,
  15 => 2,
  16 => 0,
  17 => 1,
  18 => 1,
  19 => 0,
  20 => 2,
];

$query = $db->query(
  'SELECT level FROM users WHERE userid = :userId',
  ['userId' => $data['userId']]
);
$level = (int) $query->fetch()['level'];

$query = $db->query(
  'SELECT teamname FROM teamate WHERE userid = :userId',
  ['userId' => $data['userId']]
);
$teamName = $query->fetch()['teamname'];

$points = $goodAnswers[$data['questionId']] === (int) $data['answer'] ? $level : -$level;

$query = $db->query(
  'UPDATE teams SET score = score + :points WHERE name = :teamName',
  ['points' => $points, 'teamName' => $teamName]
);
$query->execute();
