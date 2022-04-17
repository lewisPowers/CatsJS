let mainDivEl = createElement('div', 'cat-main', '');
let catDivEl = createElement('div', 'cat', 'cat-div');
let audioEl = createElement('audio', '', 'cat-sound');
let imgEl = createElement('img', '', 'cat-pic');


let ulEl = document.getElementsByTagName('UL')[0];
let testSwipeEl = document.getElementById('test-swipe');
// let onScreenEls = document.getElementsByClassName('on-screen');

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
  element.setAttribute( attribute, relPath + finalPath )
}

function meow() {
  let randomIdx = Math.floor(Math.random() * audioPaths.length)
  let meow = document.querySelector('#cat-sound');
  setPath(catSound, 'src', sfxPath, audioPaths[randomIdx]);
  setTimeout(function() {
    meow.play();
  }, 400)
}

function catPopup() {
  let randomIdx = Math.floor(Math.random() * catPicPaths.length)
  setPath(catPic, 'src', imgPath, catPicPaths[randomIdx]);
  catPic.classList.add('show');
  meow();
}

function catSwipe(element, delay) {
  element.parentElement.style.overflow = 'hidden';
  setTimeout(function() {
    element.style.display = 'none';
    element.parentElement.style.overflow = 'auto';
  }, delay);
  element.classList.add('slide');
}

function removeClassDelay(el, className, seconds) {
  setTimeout(function() {
    el.classList.remove(className);
  }, seconds * 1000)
}

let rotationClasses = ['', '', '', '', 'top', 'right-top', 'left', 'right', '', '', '', '', '', '', '', '' ];

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

let observer2 = new IntersectionObserver(function(entries) {

  entries.forEach(function(entry) {
    // console.log(entry.target)
    entry.target.classList.toggle('on-screen', entry.isIntersecting)
    if (entry.target.threshold < 1) entry.target.classList.remove('on-screen')
    // let onScreenEls = document.getElementsByClassName('on-screen');
    // console.log(onScreenEls)

    // let scrollY = entry.screenY;
    // setInterval(function() {
    //   if (!entry.target.classList.contains('on-screen')) {
    //     clearTimeout()
    //   }
    //   setTimeout(function() {
    //     if (entry.target.classList.contains('on-screen')) {
          // let onScreenEls = document.getElementsByClassName('on-screen');
          // let randomIdx = Math.floor(Math.random() * onScreenEls.length);
          // catSwipe(onScreenEls[randomIdx], 2000)
    //     }
    //   }, 10)

    // }, 10000)
  })



  // catSwipe(onScreenEls[randomIdx], 5000)

}, {
  threshold: 1
  // rootMargin: '-10px'
})
// observer2.observe(testSwipeEl);
// observer2.observe(ulEl);
let ulChildren = Array.from(ulEl.children)
ulChildren.forEach(function(child) {
  observer2.observe(child)
})


// random interval between 30seconds and 2 minutes
function getSeconds() {
  return Math.floor( (Math.random() * 90) + 30) * 1000;
}
// Cat Swipe
setInterval(function() {
  console.log('interval function initiated')
  let onScreenEls = document.getElementsByClassName('on-screen');
  let randomIdx = Math.floor(Math.random() * onScreenEls.length);
  let el = onScreenEls[randomIdx];
  if (el !== undefined && el.classList.contains('on-screen')) catSwipe(el, 2000);
}, 7000);



// function elementIsInView(element) {
//   // If element is in full view, it can be 'selected' by the 'cat'
//   // Intersection Observer
//   let options = {
//     root: element,
//     rootMargin: '50px',
//     threshold: 1.0
//   }
//   let scrollTop = window.addEventListener('scroll', function(e) {

//   })
//   let callback = (entries, observer) => {

//     entries.forEach(entry => {
//       // setInterval(function() {
//         console.log(entry.boundingClientRect.top)
//         console.log(entry.isIntersecting)
//         console.log(entry.intersectionRatio)
//       // }, 2000)
//       console.log(entry)
//       if (entry.intersectionRatio === 1) {
//         catSwipe(document.getElementById('test-swipe'), 5000);
//         console.log('entry conditions met')
//       }
//       // Each entry describes an intersection change for one observed
//       // target element:
//       //   entry.boundingClientRect
//       //   entry.intersectionRatio
//       //   entry.intersectionRect
//       //   entry.isIntersecting
//       //   entry.rootBounds
//       //   entry.target
//       //   entry.time
//     });
//   };
//   let observer = new IntersectionObserver(callback, options);

//   // let target = document.querySelector('#test-swipe');
//   // observer.observe(target);
//   observer.observe(element);
//   console.log(element)
// }




var scrolling = false;
var scrolling_timeout;
var reading_check_interval;
var reading_check_delay = 5;    // seconds
var completePartial = false;     // "true" to include partially in viewport
var monitored_elements = $(".on-screen");
// $("#test-swipe");
var visible_begins = [];


// Scroll handler
// $(window).on("scroll",function(){
//   if(!scrolling){
//     // console.log("User started scrolling.");
//   }
//   scrolling = true;

//   clearTimeout(scrolling_timeout);
//   scrolling_timeout = setTimeout(function(){
//     scrolling = false;
//     // console.log("User stopped scrolling.");

//     // User stopped scrolling, check all element for visibility
//     monitored_elements.each(function(){
//       if($(this).visible(completePartial)){
//         console.log(this.id+" is in view.");

//         // Check if it's already logged in the visible_begins array
//         var found = false;
//         for(i=0;i<visible_begins.length;i++){
//           if(visible_begins[i].id == this.id){
//             found = true;
//           }
//         }
//         if(!found){
//           // Push an object with the visible element id and the actual time
//           visible_begins.push({id:this.id,time:new Date().getTime()});
//         }
//       }
//     });
//   },200);   // scrolling delay, 200ms is good.
// }); // End on scroll handler


// // visibility check interval
// reading_check_interval = setInterval(function(){
//   monitored_elements.each(function(){
//     console.log('THis: ', this)
//     if($(this).visible(completePartial)){
//       // The element is visible
//       // Check all object in the array to fing this.id
//       for(i=0;i<visible_begins.length;i++){
//         if(visible_begins[i].id == this.id){
//           var now = new Date().getTime();
//           var readTime = ((now-visible_begins[i].time)/1000).toFixed(1);
//           console.log(visible_begins[i].id+" is in view since "+readTime+" seconds.")
//         }

//       }
//     }else{
//       // The element is not visible
//       // Remove it from thevisible_begins array if it's there
//       for(i=0;i<visible_begins.length;i++){
//         if(visible_begins[i].id == this.id){
//           visible_begins.splice(i,1);
//           console.log(this.id+" was removed from the array.");
//         }
//       }
//     }
//   });
// },reading_check_delay*1000);  // End interval





let eventlisteners = function() {
  // keep catDiv over viewport
  document.addEventListener('scroll', function(e) {
    let pixels = window.scrollY;
    mainDivEl.style.top = `${pixels}px`;
  })
}

// elementIsInView(testSwipeEl);
eventlisteners();

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