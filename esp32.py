# simulate a given amount of esp32 devices that send data through a given http server at a given interval
# syntax: python3 main.py <host> [<amount of devices>]

import requests
from random import randint
from json import dumps
from datetime import datetime
from sys import argv
from os import system, name

if name == "nt":
	def cls(): system("cls")
else: 
	def cls(): system("clear")
def average(data: list): return sum(data) / len(data)

# verify that the correct amount of arguments are given
if len(argv) < 2 or len(argv) > 3:
	print("Syntax: python3 main.py <host> [<amount of devices>]")
	exit(1)

# store the given arguments
host = argv[1]
amount = int(argv[2]) if len(argv) > 2 else 1

# create display variables
i = 0
times = []

cls()
input(f"Simulating {amount} devices sending data to {host}\nPress enter to start...")
cls()

# simulate the devices
try:
	while True:
		start = datetime.now()
		# get random values
		values = {
			"device_id": randint(0, amount - 1),
			"timestamp": str(datetime.now()),
			"temperature": randint(0, 40),
			"humidity": randint(0, 100),
			"light": randint(0, 1000)
		}

		# send the data to the server
		requests.post(host, data=values)

		# display the data
		print(i := i + 1)
		print(f"{str(datetime.now())[:-5]}: data sent: {dumps(values)}")
		times.append((datetime.now() - start).total_seconds())
		print(f"Average request time: {average(times)} seconds\n")
except KeyboardInterrupt:
	print("Exiting...")
	exit(0)
