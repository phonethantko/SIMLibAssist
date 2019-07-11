function $(id) {
  return document.getElementById(id);
}

window.addEventListener('load', init, false);

function init() {
  parseLocalStorage();
  $('autoRedirect').checked = option_AutoRedirect;
  $('enableSIM').checked = option_EnableSIM;
  buttonLogic();
}

function buttonLogic() {
  // If there is more than one proxy available.

}

function save() {
  buttonLogic();
  localStorage.autoRedirect = $('autoRedirect').checked;
  localStorage.enableSIM = $('enableSIM').checked;

  chrome.extension.getBackgroundPage().parseLocalStorage();
  $('autoRedirectStatus').innerHTML = 'Saved.';
  $('autoRedirectStatus').style.display = 'block';
  setTimeOut(() => {
    $('autoRedirectStatus').style.display = 'none'
  }, 1500);
}

document.onreadystatechange = () => {
  if (document.readyState == "complete") {
    let buttons = document.getElementsByTagName('input');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', () => {
        save();
      }, false);
    }
  }
}
