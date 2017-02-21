#include <ArduinoJson.h>
#include <Wire.h>

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

  // TIMER0 8ビット高速PWM動作 MAX:0xFF
  TCCR0A = 0x00;
  TCCR0B = 0x00;
  bitSet(TCCR0A, WGM00);
  bitSet(TCCR0A, WGM01);
  bitSet(TCCR0A, COM0B1);
  bitSet(TCCR0A, COM0A1);

  OCR0A = 5;
  OCR0B = 5;

  // TIMER2 8ビット高速PWM動作 MAX:0xFF
  TCCR2A = 0x00;
  TCCR2B = 0x00;
  bitSet(TCCR2A, WGM20);
  bitSet(TCCR2A, WGM21);
  bitSet(TCCR2A, COM2B1);
  bitSet(TCCR2A, COM2A1);

  OCR2A = 5;
  OCR2B = 5;

  // TIMER1高速PWM動作 MAX:ICR1
  TCCR1A = 0x00;
  TCCR1B = 0x00;
  bitSet(TCCR1A, WGM11);
  bitSet(TCCR1A, COM1B1);
  bitSet(TCCR1A, COM1A1);
  bitSet(TCCR1B, WGM12);
  bitSet(TCCR1B, WGM13);
  ICR1 = 40000;   // 16MHz/8分周/40000 count => 20ms周期に設定
  OCR1A = 30000;
  OCR1B = 4000;

  // 出力ピン設定
  pinMode(LED_R, OUTPUT);
  pinMode(LED_G, OUTPUT);
  pinMode(LED_B, OUTPUT);
  pinMode(LED_Status, OUTPUT);
  pinMode(Servo_0, OUTPUT);
  pinMode(Servo_1, OUTPUT);

  bitSet(TCCR0B, CS00); // 分周なしタイマスタート
  bitSet(TCCR1B, CS11); // 分周なしタイマスタート
  bitSet(TCCR2B, CS20); // 分周なしタイマスタート
}
void timer0Start() {
  bitSet(TCCR0B, CS00); // 分周なしタイマスタート
}
// One Second delay without Timer 0
void delayOneSec()
{
  unsigned int ms = 1000;
  while (ms > 0) {
    delayMicroseconds(700);
    ms--;
  }
}


// y = ax + b
uint16_t maxWord = 4430;
uint16_t minWord = 980;
float a = (float) (maxWord - minWord) / 180;
float b = (float) (maxWord + minWord) / 2;

uint16_t degreeToWord(int8_t degree) {
  uint16_t word = (float)  a * degree + b;

  if (word < minWord) word = minWord;
  if (word > maxWord) word = maxWord;

  return word;
}

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
    uint8_t Status = json["Status"];
    if (Status == 0) {
      bitClear(TCCR0A, COM0B1);
    } else {
      bitSet(TCCR0A, COM0B1);
    }
    OCR0B = Status;
  }
  if (json.containsKey("R")) {
    uint8_t R = json["R"];
    if (R == 0) {
      bitClear(TCCR2A, COM2A1);
    } else {
      bitSet(TCCR2A, COM2A1);
    }
    OCR2A = R;
  }

  if (json.containsKey("G")) {
    uint8_t G = json["G"];
    if (G == 0) {
      bitClear(TCCR2A, COM2B1);
    } else {
      bitSet(TCCR2A, COM2B1);
    }
    OCR2B = G;
  }
  if (json.containsKey("B")) {
    uint8_t B = json["B"];
    if (B == 0) {
      bitClear(TCCR0A, COM0A1);
    } else {
      bitSet(TCCR0A, COM0A1);
    }
    OCR0A = B;
  }
  if (json.containsKey("S1")) {
    int8_t S1 = json["S1"];
    OCR1A = degreeToWord(S1);
  }
  if (json.containsKey("S2")) {
    int8_t S2 = json["S2"];
    OCR1B = degreeToWord(S2);
  }
}


void loop() {}
