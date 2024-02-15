<?php

namespace Jordybsk\ExPostgress;

use JetBrains\PhpStorm\NoReturn;

class Lib {
    public static function callAPI(string $method, string $url, array|null $data = null, string|null $auth = null): bool|string {
        $curl = curl_init();

        switch ($method) {
            case "POST":
                curl_setopt($curl, CURLOPT_POST, 1);

                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
            case "PUT":
                curl_setopt($curl, CURLOPT_PUT, 1);
                break;
            default:
                if ($data)
                    $url = sprintf("%s?%s", $url, http_build_query($data));
        }

        // Optional Authentication:
        if ($auth) {
            curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
            curl_setopt($curl, CURLOPT_USERPWD, $auth);
        }

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);

        curl_close($curl);

        return $result;
    }
    #[NoReturn] public static function respond(string $message, array $data = []): void {
        echo json_encode(['message' => $message, ...$data], JSON_PRETTY_PRINT);
        exit;
    }
}