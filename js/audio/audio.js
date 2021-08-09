"use strict";

// console.clear();
// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
let mstrVol;


// tracks
const notes = {
  d: null,
  e: null,
  c: null,
  g: null
}

function getData() {
  // https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData
  notes.g = audioCtx.createBufferSource();
  let req = new XMLHttpRequest();

  // true: it is async
  req.open('GET', '/audio/g.mp3', true);

  req.responseType = 'arraybuffer';

  req.onload = function () {
    let audioData = req.response;

    audioCtx.decodeAudioData(audioData, function(buffer){
      notes.g.buffer = buffer;
      notes.g.loop = true;
    },
    function(e) { console.log('error with decoding audio data' + e.err) });
  }

  req.send();

}

function resumeAudioCtx() {
  if (audioCtx.state === 'suspended') {
    console.log('audio.ctx was suspended - now resumed');
		audioCtx.resume();

    mstrVol = new audioCtx.createGain();
    mstrVol.gain.value = 0;
    notes.g.connect(mstrVol).connect(audioCtx.destination);
    notes.g.start(0);
	}
}

function playAudioBuffer(whichBuffer) {
  let buffer = null;

  switch(whichBuffer) {
    case 'd':
      buffer = notes.d;
      break;
    case 'e':
      buffer = notes.e;
      break;
    case 'c':
      buffer = notes.c;
      break;
    case 'g':
      buffer = notes.g;
      break;
    default:
      console.log('could not assign buffer');
      break;
  }

  
  
}

function pauseAudioBuffer(whichBuffer) {

}


document.getElementById('startAudioBtn').addEventListener('click', (e) => {
  
  resumeAudioCtx();
  getData();
  e.preventDefault();
});



