parseLocalStorage();

const SIMProxyURL = '.ezproxy.sim.edu.sg';

function checkURLForRedirect(tabId, parsedURL) {
  if (option_EnableSIM) {
    if (sim_resources.hasOwnProperty(parsedURL.host)) {
      redirectToProxy(tabId, parsedURL, SIMProxyURL);
      return true;
    }
  }
  return false;
}

function redirectToProxy(tabId, parsedURL, proxyURL, appendString) {
  if (!appendString) {
    appendString = '';
  }
  let proxiedURL = parsedURL.protocol + '://' + parsedURL.host + proxyURL + parsedURL.relative + appendString;
  try {
    chrome.tabs.update(tabId, {url: proxiedURL});
  } catch (e) {
    //
  } finally {
    //
  }
}

function checkNavObject(frameId, tabId, url) {
  if (option_AutoRedirect && frameId == 0) {
    let parsedURL = parseUri(url);
    checkURLForRedirect(tabId, parsedURL);
  }
}

chrome.webNavigation.onBeforeNavigate.addListener(navObj => {
  checkNavObject(navObj.frameId, navObj.tabId, navObj.url);
});
chrome.tabs.onCreated.addListener(navObj => {
  checkNavObject(0, navObj.id, navObj.url);
});
chrome.webNavigation.onTabReplaced.addListener(navObj => {
  chrome.tabs.get(navObj.tabId, tab => {
    checkNavObject(0, navObj.id, navObj.url);
  });
});

function showHint(warning) {
  chrome.notifications.create(
    'note',
    {
      type: 'basic',
      // iconUrl:
      title: 'Unnecessary Click',
      message: warning
    },
    noteId => {
      setTimeOut(() => {
        chrome.notifications.clear(noteId, () => {})
      }, 8000);
    }
  );
}

chrome.browserAction.onClicked.addListener(tab => {
  let parsedURL = parseUri(tab.url);
  if (parsedURL.protocol == 'http' || parsedURL.protocol == 'https') {
    if (parsedURL.host.substring(parsedURL.host.length - 18) != 'ezproxy.sim.edu.sg') {
      redirectToProxy(tab.id, parsedURL, SIMProxyURL);
    } else {
      showHint('You are probably already using the proxy.');
    }
  } else {
    showHint('This extension only works on websites starting with http:// or https://');
  }
});
