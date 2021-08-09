let facemesh;
let video;
let predictions = [];
let isMouthOpen = false;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("predict", (results) => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints
  drawKeypoints();
  yawnScore();
  
  if (isMouthOpen) text("open", 10, 10);
  
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      fill(0, 255, 0);
      ellipse(x, y, 5, 5);
    }
  }
}

function yawnScore() {
  var leftEyeInnerX = 0;
  var leftEyeInnerY = 0;
  var rightEyeInnerX = 0;
  var rightEyeInnerY = 0;
  
  var mouthUpperInnerLipY = 0;
  var mouthLowerInnerLipY = 0;

  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];

      if (j == 133) {
        //left inner Eye
        leftEyeInnerX = x;
        leftEyeInnerY = y;
      } else if (j == 362) {
        //right inner Eye
        rightEyeInnerX = x;
        rightEyeInnerY = y;
      } else if (j == 13) {
        //mouthUpperInnerLipY
        mouthUpperInnerLipY = y;
      } else if (j == 14) {
        //mouthLowerInnerLipY
        mouthLowerInnerLipY = y;
      }
    }

    fill(255, 0, 255);
    ellipse(leftEyeInnerX, leftEyeInnerY, 5, 5);
    ellipse(rightEyeInnerX, rightEyeInnerY, 5, 5);

    var eyeDist = dist(
      leftEyeInnerX,
      leftEyeInnerY,
      rightEyeInnerX,
      rightEyeInnerY
    );
    //console.log(eyeDist);
    
    
  var mouthOpen = max(mouthLowerInnerLipY - mouthUpperInnerLipY, 0);
  
  var yawnFactor = mouthOpen / eyeDist;
  yawnFactor = constrain(yawnFactor, 0, 1);
  console.log(yawnFactor);
    
    if (yawnFactor > 0.4) {
      isMouthOpen = true;
    } else {
      isMouthOpen = false;
    } 
    
  }
}
