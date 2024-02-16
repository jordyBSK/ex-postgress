# ex-postgress

## Esp 32 Simulation
In the repository you can find a "esp32.py" file, which can be used to simulate ESP32.\
The file can be run with the following command: ``python esp32.py <url> [<amount of devices>] [<interval>]``\
Once the file is running, it will send a POST request to the server at a given interval, simulating a given amount of devices.
The data of the request looks like this:
```jsonc
[
	{
		"device_id": "xxxxx",
		"timestamp": "xxxxx",
		"temperature": "xxxxx",
		"humidity": "xxxxx",
		"light": "xxxxx"
	}
]
```

## Login Backend
Once the project is cloned, you can use the login backend
1. Go to the folder `login`
2. install the dependencies with `composer install`
3. Run the server with `php -S localhost:8000 -t public`
```bash
cd login
composer install
php -S localhost:8000 -t public
```
Once the server is running, you can send a GET request to:
### Login
`http://localhost:8000/login.php` with the following body:
```jsonc
{
	"token": "xxxxx", // The token is optional
	"username": "xxxxx",
	"password": "xxxxx"
}
```
If it is successful, it will return a token, which you can use to send requests to the server
### Register
`http://localhost:8000/register.php` with the following body:
```jsonc
{
	"username": "xxxxx",
	"password": "xxxxx"
}
```
### Request
The request endpoint is used to send a request to any server, it only send requests to the server if the token is valid
`http://localhost:8000/request.php` with the following body:
```jsonc
{
	"token": "xxxxx",
	"url": "xxxxx",
	"data": {
		"xxxxx": "xxxxx"
	}
}
```
### Logout
The logout endpoint will remove the token from the server's database wich will make it invalid
`http://localhost:8000/logout.php` with the following body:
```jsonc
{
	"token": "xxxxx"
}
```
