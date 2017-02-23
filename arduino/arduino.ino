#include <ArduinoJson.h>
#include <Wire.h>

// setup functions
void setupTimer0();
void setupTimer2();
void setupTimer1();
void setupOutputPin();

// update functions
void updateStatusLed(uint8_t brightness);
void updateRedLed   (uint8_t brightness);
void updateGreenLed (uint8_t brightness);
void updateBlueLed  (uint8_t brightness);
void updateServo1   (float degree);
void updateServo2   (float degree);
uint16_t degreeToWord(int8_t degree, int min_rad, int max_rad, uint16_t min, uint16_t max);

// pin numbers
const int LED_R = 11;
const int LED_G = 3;
const int LED_B = 6;
const int LED_Status = 5;
const int Servo_0 = 9;
const int Servo_1 = 10;


void setup() {
  Serial.begin(9600);
  Wire.begin(8);                // join i2c bus with address #8
  Wire.onReceive(receiveEvent); // register event

  // タイマー設定
  setupTimer0();
  setupTimer2();
  setupTimer1();

  //  OCR1B = 1920;
  //  OCR1B = 3870;
  // 出力ピン設定
  setupOutputPin();
  bitSet(TCCR0B, CS00); // 分周なしタイマスタート
  bitSet(TCCR1B, CS11); // 分周なしタイマスタート
  bitSet(TCCR2B, CS20); // 分周なしタイマスタート
}

void loop() {}

void receiveEvent(int howMany) {
  char recvData[32] = {};

  int dataSize = Wire.available();
  for (int i = 0 ; i < dataSize ; i++) {
    recvData[i] = Wire.read();
  }

  Serial.println(recvData);

  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.parseObject(recvData);

  if (json.containsKey("Status")) {
    updateStatusLed(json["Status"]);
  }
  if (json.containsKey("R")) {
    updateRedLed(json["R"]);
  }

  if (json.containsKey("G")) {
    updateGreenLed(json["G"]);
  }
  if (json.containsKey("B")) {
    updateBlueLed(json["B"]);
  }
  if (json.containsKey("S1")) {
    updateServo1(json["S1"]);
  }
  if (json.containsKey("S2")) {
    updateServo2(json["S2"]);
  }
}

void setupTimer0() {

  // TIMER0 8ビット高速PWM動作 MAX:0xFF
  TCCR0A = 0x00;
  TCCR0B = 0x00;
  bitSet(TCCR0A, WGM00);
  bitSet(TCCR0A, WGM01);
  bitSet(TCCR0A, COM0B1);
  bitSet(TCCR0A, COM0A1);

  updateBlueLed(5);
  updateStatusLed(5);
}
void setupTimer2() {
  // TIMER2 8ビット高速PWM動作 MAX:0xFF
  TCCR2A = 0x00;
  TCCR2B = 0x00;
  bitSet(TCCR2A, WGM20);
  bitSet(TCCR2A, WGM21);
  bitSet(TCCR2A, COM2B1);
  bitSet(TCCR2A, COM2A1);

  updateRedLed(5);
  updateGreenLed(5);
}

void setupTimer1() {
  // TIMER1高速PWM動作 MAX:ICR1
  TCCR1A = 0x00;
  TCCR1B = 0x00;
  bitSet(TCCR1A, WGM11);
  bitSet(TCCR1A, COM1B1);
  bitSet(TCCR1A, COM1A1);
  bitSet(TCCR1B, WGM12);
  bitSet(TCCR1B, WGM13);
  ICR1 = 40000;   // 16MHz/8分周/40000 count => 20ms周期に設定

  updateServo1(0);
  updateServo2(0);
}
void setupOutputPin() {
  pinMode(LED_R, OUTPUT);
  pinMode(LED_G, OUTPUT);
  pinMode(LED_B, OUTPUT);
  pinMode(LED_Status, OUTPUT);
  pinMode(Servo_0, OUTPUT);
  pinMode(Servo_1, OUTPUT);
}

uint16_t degreeToWord(float degree, int min_rad, int max_rad, uint16_t min, uint16_t max) {
  float a = (float) (max - min) / (abs(min_rad) + abs(max_rad));
  float b = (float) (max + min) / 2;

  uint16_t word = (float)  a * degree + b;

  if (word < min) word = min;
  if (word > max) word = max;

  return word;
}

void updateStatusLed(uint8_t brightness) {
  if (brightness == 0) {
    bitClear(TCCR0A, COM0B1);
  } else {
    bitSet(TCCR0A, COM0B1);
  }
  OCR0B = brightness;
}

void updateRedLed(uint8_t brightness) {
  if (brightness == 0) {
    bitClear(TCCR2A, COM2A1);
  } else {
    bitSet(TCCR2A, COM2A1);
  }
  OCR2A = brightness;
}

void updateGreenLed(uint8_t brightness) {
  if (brightness == 0) {
    bitClear(TCCR2A, COM2B1);
  } else {
    bitSet(TCCR2A, COM2B1);
  }
  OCR2B = brightness;
}

void updateBlueLed(uint8_t brightness) {
  if (brightness == 0) {
    bitClear(TCCR0A, COM0A1);
  } else {
    bitSet(TCCR0A, COM0A1);
  }
  OCR0A = brightness;
}
void updateServo1(float degree) {
  OCR1A = degreeToWord(degree, -90, +90, 980, 4430);
}

void updateServo2(float degree) {
  OCR1B = degreeToWord(degree, -180, +180, 1920, 3870);
}



