# Tabify

Google Chrome extension for managing tabs
***

## Features
1. Mute all unmuted tabs with Ctrl/Command + Q
2. Unmute all muted by this extension tabs with Ctrl/Command + Q
3. Mute/Unmute tabs with Ctrl+Shift+1 when Chrome is not in focus
***

## Build and Install
1. Run **npm install** in root
2. Run **npm run build** in root
3. Add the extension in Chrome in **Developer mode**
   1. Open **chrome://extensions** in Chrome
   2. Enable **Developer mode**
   3. **LOAD UNPACKED** extension by choosing the root folder
   4. Copy the **extension ID** from the page
4. Replace the **Tabify.ID** value in Tabify.js with the copied ID
5. **Refresh** the extension in chrome://extensions
![alt text](images/chrome_extensions.png "chrome://extensions")