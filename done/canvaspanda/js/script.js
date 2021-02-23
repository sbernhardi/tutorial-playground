let canvas = document.querySelector("#my-canvas");
let ctx = canvas.getContext("2d");

// // #### create a triangle with lines ####
// ctx.strokeStyle = "#ff0";
// ctx.lineWidth = 10;
// ctx.moveTo(200, 50);
// ctx.lineTo(600, 300);
// ctx.lineTo(600, 100);
// ctx.closePath();
// ctx.stroke();

// // #### create rectangles with strokeRect(x1, y1, width, height) ####
// ctx.strokeStyle = "#f0f";
// ctx.lineWidth = 10;
// ctx.strokeRect(100, 100, 400, 200);
// ctx.strokeStyle = "#00f";
// ctx.lineWidth = 10;
// ctx.strokeRect(400, 200, 400, 200);
// ctx.fillStyle = "#ff0";
// ctx.fillRect(400, 200, 100, 100);
// ctx.clearRect(425, 225, 50, 50);


// // #### create arcs with arc(centerX, centerY, radius, startAngle, endAngle)
// // #### we need to convert degrees to radiants with Math.PI:
// // #### 90° == 0.5 * PI ; 180° == PI ; 270° == 1.5 * PI ; 360° == 2 * PI 
// // #### The circle starts and ends East (0°/360°) and goes clockwise, 
// // #### i.e. South == 90°; West == 180° and North == 270°
// ctx.arc(500, 200, 200, 0, Math.PI);
// ctx.fillStyle = "#00f";
// ctx.fill();


// #### Project Panda ####


let sizeMain = 200;
let xMain = 500;
let yMain = 300;


// Ears
let sizeEar = sizeMain/3.55;
let earXOff = sizeEar *2.5;
let earYOff = sizeEar *2.5;

// Ear Left
let xEL = xMain - earXOff;
let yEL = yMain - earYOff;
ctx.beginPath();
ctx.arc(xEL, yEL, sizeEar, 0, 2*Math.PI);
ctx.fillStyle = "#000";
ctx.fill();

// Ear Right
let xER = xMain + earXOff;
let yER = yMain - earYOff;
ctx.beginPath();
ctx.arc(xER, yER, sizeEar, 0, 2*Math.PI);
ctx.fillStyle = "#000";
ctx.fill();


// Face
ctx.beginPath();
ctx.arc(xMain, yMain, sizeMain, 0, 2*Math.PI);
ctx.lineWidth = sizeMain/10;
ctx.stroke();
ctx.fillStyle = "#fff";
ctx.fill();


// Eyes
let sizeEye = sizeMain/6.6;
let sizeEyeRing = sizeEye*1.3;

let eyeXOff = sizeEye * 3.4;
let eyeYOff = sizeEye * 1.4;

// Pupil
let sizePupil = sizeEye/1.4;
let pupilXOff = eyeXOff - sizePupil/7;
let pupilYOff = eyeYOff;

// Eye Left
let xEyeL = xMain - eyeXOff;
let yEyeL = yMain - eyeYOff;
ctx.beginPath();
ctx.arc(xEyeL, yEyeL, sizeEye, 0, 2*Math.PI);
ctx.lineWidth = sizeEyeRing;
ctx.stroke();
ctx.fillStyle = "#fff";
ctx.fill();

// Pupil Left
let xPupilL = xMain - pupilXOff;
let yPupilL = yMain - pupilYOff;
ctx.beginPath();
ctx.arc(xPupilL, yPupilL, sizePupil, 0, 2*Math.PI);
ctx.fillStyle = "#000";
ctx.fill();

// Eye Right
let xEyeR = xMain + eyeXOff;
let yEyeR = yMain - eyeYOff;
ctx.beginPath();
ctx.arc(xEyeR, yEyeR, sizeEye, 0, 2*Math.PI);
ctx.lineWidth = sizeEyeRing;
ctx.stroke();
ctx.fillStyle = "#fff";
ctx.fill();

// Pupil Right
let xPupilR = xMain + pupilXOff;
let yPupilR = yMain - pupilYOff;
ctx.beginPath();
ctx.arc(xPupilR, yPupilR, sizePupil, 0, 2*Math.PI);
ctx.fillStyle = "#000";
ctx.fill();

// Nose
let sizeNose = sizeMain/6.5;
ctx.beginPath();
ctx.arc(xMain, yMain, sizeNose, 0, 2*Math.PI);
ctx.fillStyle = "#000";
ctx.fill();


// Mouth
let sizeMouth = sizeMain/2;
let sizeLips = sizeMouth/9.5;

let mouthXOff = 0;
let mouthYOff = sizeMouth/2.8;

let xMouth = xMain - mouthXOff;
let yMouth = yMain + mouthYOff;

ctx.beginPath();
ctx.arc(xMouth, yMouth, sizeMouth, 0.1 * Math.PI, 0.9 * Math.PI );
ctx.lineWidth = sizeLips;
ctx.strokeStyle = "#000";
ctx.stroke();
