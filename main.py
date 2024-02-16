# simulate a given amount of esp32 devices that send data through a given http server at a given interval
# syntax: python3 main.py <host> [<amount of devices>] [<interval>]

from time import sleep
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

# simulate the devices
while True:
	start = datetime.now()
	sleep(interval - (datetime.now() - start).total_seconds())
