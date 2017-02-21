import smbus
import time

bus = smbus.SMBus(1)
address = 0x08

def convert_json(string):
    command = ord(string[0])
    values = []

    for c in string[1:]:
        values.append(ord(c))

    return command, values
    

if __name__ == '__main__':
    json_string = '{"R": 255, "G": 255, "B": 255}'
    command, values = convert_json(json_string)

    while True:
        bus.write_i2c_block_data(address, command, values)
        time.sleep(3)
