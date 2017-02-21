import smbus
import time

bus = smbus.SMBus(1)

SLAVE_ADDRESS = 0x04

def request_reading():
    reading = int(bus.read_byte(SLAVE_ADDRESS))
    print(reading)

while True:
    txt = str(raw_input("Enter some text to send it to Arduino:"))
    bus.write_byte(SLAVE_ADDRESS, ord(txt))
    # if command == '1':
    #     bus.write_byte(SLAVE_ADDRESS, ord('1'))
    # elif command == 'r':
    #     request_reading()
