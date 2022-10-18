<?php

include 'Db.php';

$db = Db::getInst();

$rows = $db->fetchAll(<<<SQL
    SELECT *
    FROM teams
    INNER JOIN teamate
        ON teamate.teamname = teams.name
    INNER JOIN users
        ON users.userid = teamate.userid
    WHERE users.userid <> :adminUserId
SQL,
  ['adminUserId' => getenv('MASTER_KEY')]
);

echo json_encode($rows);
