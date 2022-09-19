<?php

class Db {
  private PDO $connection;

  private function __construct() {
    $this->connection = new PDO(
      sprintf('mysql:host=%s;dbname=%s', $_ENV['PLANETSCALE_DB_HOST'], $_ENV['PLANETSCALE_DB']),
      $_ENV['PLANETSCALE_DB_USERNAME'],
      $_ENV['PLANETSCALE_DB_PASSWORD'],
      [
        PDO::MYSQL_ATTR_SSL_CA => $_ENV['PLANETSCALE_SSL_CERT_PATH'],
      ]
    );
  }

  public static function getInst(): self {
    return new self();
  }

  public function execute(string $sql, array $args) {
    return $this->connection->prepare($sql)->execute($args);
  }

  public function fetchAll(string $sql, array $args) {
    $statement = $this->connection->prepare($sql);
    $statement->execute($args);
    $statement->setFetchMode(PDO::FETCH_ASSOC);

    return $statement->fetchAll();
  }

  public function fetch(string $sql, array $args) {
    $statement = $this->connection->prepare($sql);
    $statement->execute($args);
    $statement->setFetchMode(PDO::FETCH_ASSOC);

    return $statement->fetch();
  }
}
