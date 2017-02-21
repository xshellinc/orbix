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
    while True:
        json_string = str(raw_input('Input a valid JSON: '))
        command, values = convert_json(json_string)
        bus.write_i2c_block_data(address, command, values)
