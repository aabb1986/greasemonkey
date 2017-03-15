let details = JSON.parse(unescape(document.location.search.substr(1)));

/****************************** INSTALL BUTTON *******************************/

let installCountdown = 9;
let btnInstall = document.getElementById('btn-install');
function onClickInstall(event) {
  browser.runtime.sendMessage({
    'name': 'UserScriptInstall',
    'details': details
  });

  btnInstall.parentNode.replaceChild(progressBar, btnInstall);
}
let installCounter = document.createElement('span');
installCounter.textContent = installCountdown;
btnInstall.appendChild(document.createTextNode(' '));
btnInstall.appendChild(installCounter);
let installTimer = setInterval(() => {
  installCountdown--;
  if (installCountdown) {
    installCounter.textContent = installCountdown;
  } else {
    clearTimeout(installTimer);
    btnInstall.removeChild(installCounter);
    btnInstall.classList.remove('disabled');
    btnInstall.addEventListener('click', onClickInstall, true);
  }
}, 250);

/******************************* PROGRESS BAR ********************************/

let progressBar = document.createElement('progress');

browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  progressBar.value = message.progress;
  if (message.progress == 1.0) {
    document.body.className = 'result';
    let resultEl = document.getElementById('result')
        .getElementsByTagName('p')[0];
    // TODO: Style well!
    if (message.errors.length) {
      resultEl.textContent = JSON.stringify(message.errors);
    } else {
      // TODO: Something better?
      resultEl.textContent = 'Success!';
    }
  }
});

/****************************** DETAIL DISPLAY *******************************/

let iconContEl = document.querySelector(
    '.panel .panel-section-header .icon-section-header');
let iconEl = document.createElement('img');
iconEl.src = details.iconUrl || browser.extension.getURL('skin/userscript.png');
iconContEl.appendChild(iconEl);

document.getElementById('name').textContent = details.name;
if (details.version) {
  document.getElementById('version').textContent = details.version;
}


function addStringsToList(containerEl, listEl, strings) {
  if (strings.length == 0) {
    containerEl.style.display = 'none';
  } else {
    strings.forEach(v => {
      var el = document.createElement('li');
      el.textContent = v;
      listEl.append(el);
    });
  }
}


addStringsToList(
    document.getElementById('includes'),
    document.querySelector('#includes ul'),
    details.includes);
addStringsToList(
    document.getElementById('matches'),
    document.querySelector('#matches ul'),
    details.matches);
addStringsToList(
    document.getElementById('excludes'),
    document.querySelector('#excludes ul'),
    details.excludes);