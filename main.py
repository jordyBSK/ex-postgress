# simulate a given amount of esp32 devices that send data through a given http server at a given interval
# syntax: python3 main.py <host> [<amount of devices>] [<interval>]

import requests
from time import sleep
from random import randint
from json import dumps
from datetime import datetime
from sys import argv

# verify that the correct amount of arguments are given
if len(argv) < 2 | len(argv) > 4:
	print("Syntax: python3 main.py <host> [<amount of devices>] [<interval>]")
	exit(1)

# store the given arguments
host = argv[1]
amount = int(argv[2]) if len(argv) > 2 else 1
interval = int(argv[3]) if len(argv) > 3 else 60

input(f"Simulating {amount} devices sending data to {host} every {interval} seconds\nPress enter to start...")

# simulate the devices
try:
	while True:
		start = datetime.now()
		values = {
			str(i): {
				"timestamp": datetime.now().isoformat(),
				"temperature": randint(0, 40),
				"humidity": randint(0, 100),
				"light": randint(0, 1000)
			} for i in range(amount)
		}
		requests.post(f"{host}", data=dumps(values))
		print(f"{datetime.now().isoformat()} {dumps(values, indent=4)}")
		sleep(interval - (datetime.now() - start).total_seconds())
except KeyboardInterrupt:
	print("Exiting...")
	exit(0)
