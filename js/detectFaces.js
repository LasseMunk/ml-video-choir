"use strict";

let requestAnimationFrameID = null;

async function detectFaces(videoElement) {
  
  // Load the MediaPipe Facemesh package.
  const model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);

  // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain an
  // array of detected faces from the MediaPipe graph. If passing in a video
  // stream, a single prediction per frame will be returned.
  const predictions = await model.estimateFaces({
    input: videoElement,
    returnTensors: false,
    flipHorizontal: false,
    predictIrises: false
  });

  if (predictions.length > 0) {
    
    // console.log('face detected');
    for (let i = 0; i < predictions.length; i++) {
      const keypoints = predictions[i].scaledMesh;

      // Log facial keypoints.
      for (let j = 0; j < keypoints.length; j++) {      
        yawnScore(j, keypoints[j]);
      }
    }
  }
}


function detectFacesAnimationFrame(VideoElement) {
  detectFaces(videoElement);

  requestAnimationFrameID = requestAnimationFrame(detectFacesAnimationFrame);
}
