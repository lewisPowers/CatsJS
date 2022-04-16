let mainDivEl = createElement('div', 'cat-main', '');
let catDivEl = createElement('div', 'cat', 'cat-div');
let audioEl = createElement('audio', '', 'cat-sound');
let imgEl = createElement('img', '', 'cat-pic');

catDivEl.append(imgEl);
mainDivEl.append(audioEl);
mainDivEl.append(catDivEl);
document.body.append(mainDivEl);


let catDiv = document.getElementById('cat-div');
let catPic = document.getElementById('cat-pic');
let catSound = document.getElementById('cat-sound');

let imgPath = 'assets/img/';
let sfxPath = 'assets/sfx/';

let catPicPaths = ['kitten-scream-peek.png', 'cat.png', 'cat-glasses-removebg-preview.png', 'kitten-wink.png', 'cat-peeking.png']
let audioPaths = ['meow.mp3', 'kitty-meow.wav', 'loud-meow.mp3', 'little-cat-attention-meow.wav']



function setPath(element, attribute, relPath, finalPath) {
  element.setAttribute( attribute, relPath + finalPath[Math.floor(Math.random() * finalPath.length)] )
}

function meow() {
  let meow = document.querySelector('#cat-sound');
  setPath(catSound, 'src', sfxPath, audioPaths);
  setTimeout(function() {
    meow.play();
  }, 400)
}

function catPopup() {
  setPath(catPic, 'src', imgPath, catPicPaths);
  catPic.classList.add('show');
  meow();
}

function removeClassDelay(el, className, seconds) {
  setTimeout(function() {
    el.classList.remove(className);
  }, seconds * 1000)
}

let rotationClasses = ['', '', '', '', 'top', 'right-top', 'left', 'right' ];

function getRandomNum(length) {
  return Math.floor(Math.random() * length);
}

function cycleCatClasses() {
  catDiv.classList.forEach(name => {
    if (name !== 'cat') catDiv.classList.remove(name)
  })
  let addedClass = rotationClasses[getRandomNum(rotationClasses.length)];
  if (addedClass !== '') catDiv.classList.add(addedClass);
}


function createElement(type, className, id) {
  let el = document.createElement(type);
  if (id) el.id = id || '';
  if (className) el.classList.add(className);
  return el;
}

// catDivEl.append(imgEl);
// mainDivEl.append(audioEl);
// mainDivEl.append(catDivEl);
// document.body.append(mainDivEl);

let testInterval = 6000;
let interval = twoMinutesOrLess() * tenPlusRandomSeconds() * 1000;
function init() {
  catPopup();
  removeClassDelay(catPic, 'show', .699);
  setInterval(function() {
    cycleCatClasses();
  }, testInterval)

}
function tenPlusRandomSeconds() {
  return Math.floor( (Math.random() * 50) + 10 );
}
function twoMinutesOrLess() {
  return Math.floor(Math.random() * 2);
}
setInterval(function() {
  catPopup();
  removeClassDelay(catPic, 'show', .699);
}, testInterval);
$(window).ready(() => {
  init();
})