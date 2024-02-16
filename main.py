# simulate a given amount of esp32 devices that send data through a given http server at a given interval
# syntax: python3 main.py <host> [<amount of devices>] [<interval>]

from sys import argv

# verify that the correct amount of arguments are given
if len(argv) < 2 | len(argv) > 4:
	print("Syntax: python3 main.py <host> [<amount of devices>] [<interval>]")
	exit(1)
