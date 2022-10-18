<?php

class Db {
  private PDO $connection;

  private function __construct() {
    $options = !empty(getenv('PLANETSCALE_SSL_CERT_PATH') ?? '') ? [
      PDO::MYSQL_ATTR_SSL_CA => getenv('PLANETSCALE_SSL_CERT_PATH')
    ] : null;

    $this->connection = new PDO(
      sprintf('mysql:host=%s;dbname=%s', getenv('PLANETSCALE_DB_HOST'), getenv('PLANETSCALE_DB')),
      getenv('PLANETSCALE_DB_USERNAME'),
      getenv('PLANETSCALE_DB_PASSWORD'),
      $options
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
