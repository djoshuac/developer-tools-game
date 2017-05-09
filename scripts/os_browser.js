// CITE http://stackoverflow.com/questions/38241480/detect-macos-ios-windows-android-and-linux-os-with-js
function guessOS() {
  let userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1)
    os = 'Mac OS';
  else if (iosPlatforms.indexOf(platform) !== -1)
    os = 'iOS';
  else if (windowsPlatforms.indexOf(platform) !== -1)
    os = 'Windows';
  else if (/Android/.test(userAgent))
    os = 'Android';
  else if (!os && /Linux/.test(platform))
    os = 'Linux';

  return os;
}
// END CITE

// Duck typing to probabilistically guess Browser
// CITE http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
function guessBrowser() {
  let bs = undefined;

  if (!!window.chrome && !!window.chrome.webstore) { // Chrome 1+
    bs = "Chrome";
  }
  else if (typeof InstallTrigger !== 'undefined') { // Firefox 1.0+
    bs = "Firefox";
  }
  else if (/constructor/i.test(window.HTMLElement) || // Safari 3.0+ "[object HTMLElementConstructor]"
    ((p)=>{ return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification)) {
    bs = "Safari";
  }
  else if (!!window.StyleMedia) { // Edge 20+
    bs = "Edge";
  }

  return bs;
}
// END CITE

function getUserSettings() {
  const settings = {
    os: guessOS(),
    browser: guessBrowser(),
    console_access: null
  };

  if (settings.os == "Mac OS") {
    settings.console_access = {
      Safari: "Cmd + Opt + c",
      Firefox: "Cmd + Opt + k",
      Chrome: "Cmd + Opt + j"
    }[settings.browser];
  }
  else if (settings.os == "Linux" || settings.os == "Windows") {
    settings.console_access = {
      Firefox: "Ctrl + Shift + k",
      Chrome: "Ctrl + Shift + j"
    }[settings.browser];
  }

  return settings;
}
