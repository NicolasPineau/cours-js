<?php

echo json_encode($_GET['key'] ?? '' === getenv('MASTER_KEY'));
