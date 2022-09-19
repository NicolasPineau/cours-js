<?php

include 'Db.php';

$db = Db::getInst();

$query = $db->query(<<<SQL
    SELECT *
    FROM teams
    INNER JOIN teamate
        ON teamate.teamname = teams.name
    INNER JOIN users
        ON users.userid = teamate.userid
    WHERE users.userid <> :adminUserId
SQL,
  ['adminUserId' => 'g0j1dxfuca0b11ee']
);

echo json_encode($query->fetchAll());
