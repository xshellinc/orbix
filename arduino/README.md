# Orbix Arduino side implementation


## Installation

Clone this repository and move to target directory.

```
git clone https://github.com/xshellinc/orbix.git
cd orbix/arduino/
```

### Install ArduinoJson

1. Open Arduino menu `Sketch/Include Library/Manage Libraries...`
2. Install `ArduinoJson`

## JSON format

### LED control

```
{"R":0~255,"G":0~255,"B":0~255}
```

### Servo control

```
{"S1":-90~+90,"S2":-180~+180} # Default : {"S1":0,"S2":+180}
```

Decimals are allowed.

### Status lamp control

```
{"Status":0~255}
```

Each Json string must be limited 32 bytes.


## I2C Specification

SlaveAddress : 8

SCL and SDA  is level converted to 3.3V.
