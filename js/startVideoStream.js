// explanation of setup
// https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection
// https://www.youtube.com/watch?v=GItCuyP0G_k&ab_channel=AdarshMenon

let videoElement = document.getElementById('videoElement');

const setupCamera = () => {
  navigator.mediaDevices.getUserMedia({
    video: {  
      facingMode: 'user',
      width: 500, 
      height: 500
    },
    audio: false

  }).then((stream) => {
    // when the camera opens, set the stream as the src for the video element
    videoElement.srcObject = stream;
  });
}

setupCamera();

videoElement.onloadeddata = () => {
  // call main function when video renders first frame
  // console.log(instanceof videoElement);
  detectFacesAnimationFrame(videoElement);
}



