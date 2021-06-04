<?php

$db = new mysqli();
if (mysqli_connect_errno()) {
  echo '0';

  exit;
}

$query = $db->query(<<<SQL
    SELECT *
    FROM teams
    INNER JOIN teamate
        ON teamate.teamname = teams.name
    INNER JOIN users
        ON users.userid = teamate.userid
    WHERE users.userid <> 'g0j1dxfuca0b11ee'
SQL
);

echo json_encode($query->fetch_all(MYSQLI_ASSOC));

$query->close();
$db->close();
