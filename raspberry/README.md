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

We recommend to use [virtualenv](https://virtualenv.pypa.io/en/stable/) for create isolated Python environments.

```
virtualenv venv
source venv/bin/activate

pip install cffi
pip install smbus-cffi
```

Create a .env file

```
cp .env.example .env
```

Now you can start the application with:

```
python main.py
```
