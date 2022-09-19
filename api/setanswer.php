<?php

include 'Db.php';

$db = Db::getInst();

$data = json_decode($_POST['json'], true);

$db->execute(
  'REPLACE INTO quiz_answers(userid, questionid, answer) VALUES (:userId, :questionId, :answer)',
  [
    'userId' => $data['userId'],
    'questionId' => $data['questionId'],
    'answer' => $data['answer'],
  ]
);

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

$row = $db->fetch(
  'SELECT level FROM users WHERE userid = :userId',
  ['userId' => $data['userId']]
);
$level = (int) ($row['level'] ?? 1);

$row = $db->fetch(
  'SELECT teamname FROM teamate WHERE userid = :userId',
  ['userId' => $data['userId']]
);
$teamName = $row['teamname'];

$points = $goodAnswers[$data['questionId']] === (int) $data['answer'] ? $level : -$level;

$db->execute(
  'UPDATE teams SET score = score + :points WHERE name = :teamName',
  ['points' => $points, 'teamName' => $teamName]
);
