<?php

if ($_GET['userId'] !== 'g0j1dxfuca0b11ee') {
  exit;
}

$db = new mysqli();
if (mysqli_connect_errno()) {
  echo '0';

  exit;
}

$score = function (string $player) {
  return (int) explode('¤', $player)[0];
};

$userid = function (string $player) {
  return explode('¤', $player)[1];
};

$query = $db->query('SELECT userid, level FROM users WHERE userid <> \'g0j1dxfuca0b11ee\'');
$res = $query->fetch_all(MYSQLI_ASSOC);
$players = [];
foreach ($res as $row) {
  $players[] = $row['level'] . '¤' . $row['userid'];
}
usort($players, function (string $playerA, string $playerB) use ($score) {
  return $score($playerA) <=> $score($playerB);
});
$teams = [[], []];

$playersBackup = $players;

$iteration = 0;
while ([] !== $players) {
  $medianIndex = floor(count($players) / 2);
  $idsToRemove = [];
  $median = array_slice($players, $medianIndex, 1, TRUE);
  $idsToRemove[] = key($median);
  $player1 = current($median);

  $player1Score = $score($player1);
  $choice1 = array_slice($players, $medianIndex - 1, 1, TRUE);
  $player2Choice1 = current($choice1);
  $choice2 = array_slice($players, $medianIndex + 1, 1, TRUE);
  $player2Choice2 = current($choice2);

  if (FALSE !== $player2Choice1 || FALSE !== $player2Choice2) {
    if (FALSE === $choice2 || abs($player1Score - $score($player2Choice1)) < abs($player1Score - $score($player2Choice2))) {
      $player2 = $player2Choice1;
      $idsToRemove[] = key($choice1);
    }
    else {
      $player2 = $player2Choice2;
      $idsToRemove[] = key($choice2);
    }

    if ($iteration % 2 === 0) {
      if (FALSE !== $player2Choice1) {
        $teams[0][] = $player1;
      }
      if (FALSE !== $player2Choice2) {
        $teams[1][] = $player2;
      }
    }
    else {
      if (FALSE !== $player2Choice2) {
        $teams[0][] = $player2;
      }
      if (FALSE !== $player2Choice1) {
        $teams[1][] = $player1;
      }
    }
  }

  rsort($idsToRemove);
  foreach ($idsToRemove as $id) {
    unset($players[$id]);
  }

  $iteration++;
}

$teamNames = ['ES6 pals', 'Vanilla buddies'];
$defaultScore = 0;

$query = $db->prepare('INSERT IGNORE INTO teams(name, score) VALUES (?, ?)');
$query->bind_param('si', $teamNames[0], $defaultScore);
$query->execute();

$query = $db->prepare('INSERT IGNORE INTO teams(name, score) VALUES (?, ?)');
$query->bind_param('si', $teamNames[1], $defaultScore);
$query->execute();

var_dump($teams);
foreach ($teams as $key => $team) {
  $teamName = $teamNames[$key];
  foreach ($team as $player) {
    $playerId = $userid($player);
    $query = $db->prepare('INSERT INTO teamate(teamname, userid) VALUES (?, ?)');
    $query->bind_param('ss', $teamName, $playerId);
    $query->execute();
  }
}

$query->close();
$db->close();
