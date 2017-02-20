# orbix


# Setting up raspberry pi
insert sd card to your mac
`$ diskutil list`
find your SD card interface name. In my case, disk1
```
$ diskutil unmount disk2
$ sudo dd if=~/Downloads/2017-01-11-raspbian-jessie-lite.zip.download of=/dev/rdisk2 bs=10m
```
input formatはimagefile、output fileはdisk2、rをつけるとはやくなる。
bs=10mは書き込み速度(一度にbufferに読み込むbyte数)
ssid、pskの設定
`$　wpa-passphrase <ssid> <psk> >> /etc/wpa_supplicant/wpa_supplicant.conf`
設定更新
`$  wpa-cli reconfigure`
IPアドレスの取得
`$ dhclient wlan0`
ネットワークの確認
`$ ping 8.8.8.8`
