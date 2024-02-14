<?php

namespace Jordybsk\ExPostgress;


readonly class Database {
    public function __construct(private \PDO $pdo) {}

    public function connect(string $username, string $password): string {
		// get the hash of the password for the given username
        $stmt = $this->pdo->prepare('SELECT password FROM "user" WHERE username = ?');
        $stmt->execute([$username]);
        $hash = $stmt->fetchColumn();
        if (password_verify($password, $hash)) {
            // generate a random token
			// TODO: generate an expiration date
            $token = bin2hex(random_bytes(32));
            // store the token
            $stmt = $this->pdo->prepare('UPDATE "user" SET token = ? WHERE username = ?');
            $stmt->execute([$token, $username]);
            // return the token
            return $token;
        }
        throw new \Exception('Username or password is incorrect');
    }
}