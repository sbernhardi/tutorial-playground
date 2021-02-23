let canvas = document.querySelector("#my-canvas");
let ctx = canvas.getContext("2d");

// // #### save canvas state ####
// ctx.getImageData(x, y, width, height);

// // #### restore canvas state ####
// ctx.putImageData(imageData, x, y);

let saveBtn = document.querySelector(".save");
let restoreBtn = document.querySelector(".restore");


ctx.moveTo(500, 50);
ctx.lineTo(300, 400);
ctx.lineTo(700, 400);
ctx.lineTo(500, 50);
ctx.fill();

let savedData;
saveBtn.addEventListener("click", () => {
    savedData = ctx.getImageData(0, 0, 1000, 600);
    ctx.beginPath();
    ctx.fillStyle = "#ff0";
    ctx.arc(500, 250, 100, 0, 2 * Math.PI);
    ctx.fill();
});

restoreBtn.addEventListener("click", () => {
    ctx.putImageData(savedData, 0, 0);
});
