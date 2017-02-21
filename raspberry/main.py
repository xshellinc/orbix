import os
import smbus
import time
import websocket

from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

ws_url = os.getenv('WS_URL')

bus = smbus.SMBus(1)
address = 0x08

def convert_json(string):
    command = ord(string[0])
    values = []

    for c in string[1:]:
        values.append(ord(c))

    return command, values

# Websocket handlers
def on_message(ws, message):
    print(message)

def on_error(ws, error):
    print(error)

def on_close(ws):
    print("Closed ws connection.")

def on_open(ws):
    print("Opened ws connection.")
    ws.send("Ping")


if __name__ == '__main__':
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp(
        ws_url,
        on_message = on_message,
        on_error = on_error,
        on_close = on_close
    )

    ws.on_open = on_open
    ws.run_forever()
