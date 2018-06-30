# Overview

This is a custom build of https://github.com/tidepool-org/chrome-uploader

It will automatically upload when the program is started so you don't need to click on anything.

This repository also includes a script, `auto_upload.ps1`, that will automatically restart the Tidepool Uploader whenever a USB device is plugged in.

I use a combination of the custom build & `auto_upload.ps1` so I can just plugin my pump and have my data get uploaded.

# Instructions

If you want to use this as well, you will need to do the following:

## 1 Write your config
Update the .config.js file to include the following values:
```
module.exports = {
  ...
  USERNAME: 'YOUR USERNAME',
  PASSWORD: 'YOUR PASSWORD',
  AUTO_UPLOAD_DEVICE: 'tandem' // or whatever yours is
};
```
## 2 Do a custom build
* Checkout this repo
* Install yarn
* `yarn && yarn package-win`

## 3 Setup auto_upload.ps1
(Update Nick with your Windows username, of course)

* Open Powershell
* `powershell -ExecutionPolicy ByPass -File C:\Users\Nick\Desktop\automatic_upload.ps1`

Alternatively, put the above command in `C:\Users\Nick\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup` and it will start every time you boot
