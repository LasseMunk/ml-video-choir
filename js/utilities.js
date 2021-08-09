function constrain(num, min, max) {
  const parsedFloat = parseFloat(num);
  return Math.min(Math.max(parsedFloat, min), max); 
}

function distanceTwoXY(x1, y1, x2, y2) {  
  return Math.hypot(x2-x1, y2-y1);
}