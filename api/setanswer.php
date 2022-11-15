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
  1 => 0,
  2 => 0,
  3 => 2,
  4 => 0,
  5 => 1,
  6 => 2,
  7 => 0,
  8 => 0,
  9 => 3,
  10 => 2,
  11 => 1,
  12 => 1,
  13 => 100,
  14 => 1,
  15 => 2,
  16 => 4,
  17 => 2,
  18 => 0,
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

$points = ($goodAnswers[$data['questionId']] === 100 || $goodAnswers[$data['questionId']] === (int) $data['answer']) ? $level : -$level;

$db->execute(
  'UPDATE teams SET score = score + :points WHERE name = :teamName',
  ['points' => $points, 'teamName' => $teamName]
);
