"use strict";

async function detectFaces(videoElement) {
  // Load the MediaPipe Facemesh package.
  const model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);

  // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain an
  // array of detected faces from the MediaPipe graph. If passing in a video
  // stream, a single prediction per frame will be returned.
  const predictions = await model.estimateFaces({
    input: videoElement
  });

  if (predictions.length > 0) {
    console.log('face detected');
    for (let i = 0; i < predictions.length; i++) {
      const keypoints = predictions[i].scaledMesh;

      // // Log facial keypoints.
      // for (let i = 0; i < keypoints.length; i++) {
      //   const [x, y, z] = keypoints[i];

      //   console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
      // }
    }
  }
}
