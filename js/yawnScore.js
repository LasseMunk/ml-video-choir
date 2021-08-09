let eye = {
    left: {
      x: 0,
      y: 0
    },
    right:  {
      x: 0,
      y: 0
    }
  }

  let mouth = {
    upperLipY: 0,
    lowerLipY: 0,
    isOpen: false
  }

let yawnFactorH2 = document.getElementById('intro-description-yawnFactor');

function yawnScore(forLoopIndex, keypoints) {

  const [x, y] = keypoints;

  switch(forLoopIndex) {
    case 13:
      mouth.upperLipY = y;
      break;
    case 14:
      mouth.lowerLipY = y;
      break;
    case 133: // the left eye point most towards the nose
      eye.left.x = x;
      eye.left.y = y;
      break;
    case 362: // the right eye point most towards the nose
      eye.right.x = x;
      eye.right.y = y;
      break;
    default: 
      break;
  }

  if(forLoopIndex === 363) {

    let eyeDistance = distanceTwoXY(eye.left.x, eye.left.y, eye.right.x, eye.right.y);
    let mouthOpen = Math.max(mouth.lowerLipY - mouth.upperLipY, 0);
    let yawnFactor = mouthOpen / eyeDistance;
    yawnFactor = constrain(yawnFactor, 0, 1);
      
      if (yawnFactor > 0.4) {
        mouth.isOpen = true;
        
        if(mstrVol != undefined) {
          mstrVol.gain.value = 1;
        }
        
      } else {
        mouth.isOpen = false;

        if(mstrVol != undefined) {
          mstrVol.gain.value = 0;
        }
        
      } 

      drawYawnScoreOnIndex(yawnFactor);
  }

}



function drawYawnScoreOnIndex(yawn) {
  yawnFactorH2.innerHTML = `yawn score: ${yawn}`;
}

