# Orbix Raspberry pi side implementation

The application works on [Raspbian jessie lite](https://www.raspberrypi.org/downloads/raspbian/)

## Set up raspbian

```
sudo apt-get update
sudo apt-get install git
sudo apt-get install build-essential libi2c-dev i2c-tools python-dev libffi-dev
```

## Installation
Clone this repository and move to target directory.

```
git clone https://github.com/xshellinc/orbix.git
cd orbix/raspberry/
```

Create a .env file.

```
cp .env.example .env
```

Install dependencies.

```
npm install
```

Now you can start the application with:

```
node index.js
```
