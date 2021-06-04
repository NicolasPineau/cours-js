<?php

$data = json_decode($_POST['json'], true);
$db = new mysqli();
if (mysqli_connect_errno()) {
  echo '0';

  exit;
}

$query = $db->prepare('REPLACE INTO quiz_answers(userid, questionid, answer) VALUES (?, ?, ?)');
$query->bind_param('sii', $data['userId'], $data['questionId'], $data['answer']);
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

$query = $db->query(sprintf('SELECT level FROM users WHERE `userid` = \'%s\'', $data['userId']));
$level = (int) $query->fetch_assoc()['level'];

$query = $db->query(sprintf('SELECT teamname FROM teamate WHERE `userid` = \'%s\'', mysqli_escape_string($db, $data['userId'])));
$teamName = $query->fetch_assoc()['teamname'];

$points = $goodAnswers[$data['questionId']] === (int) $data['answer'] ? $level : -$level;

$query = $db->prepare('UPDATE teams SET score = score + ? WHERE name = ?');
$query->bind_param('is', $points, $teamName);
$query->execute();

$query->close();
$db->close();
