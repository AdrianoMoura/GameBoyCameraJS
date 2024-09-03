const gameboyPalette = [
  '#9bbc0f',
  '#8bac0f',
  '#306230',
  '#0f380f'
]

let video;
let pixels = [];

const pixelSize = 5;

function setup() {

  video = createCapture(VIDEO);
  videoHeight = 128;
  videoWidth = videoHeight / 720 * 1280;

  createCanvas(videoHeight * pixelSize, videoHeight * pixelSize);

  video.size(videoWidth, videoHeight);
}

function draw() {
  video.loadPixels();

  pixels = videoToPixelArr();

  pixels = grayscale();

  pixels = dithering();

  pixels = gbFilter();

  noStroke();

  for (let y = 0; y < pixels.length; y++) {
    for (let x = 0; x < pixels[y].length; x++) {
      fill(pixels[y][x]);
      rect(pixelSize * x, pixelSize * y, pixelSize, pixelSize);
    }
  }
}

// This function calculate the average brightness for each color and returns an grayscale version of the pixels
function grayscale() {
  for (let y = 0; y < pixels.length; y++) {
    for (let x = 0; x < pixels[y].length; x++) {

      const r = pixels[y][x][0];
      const g = pixels[y][x][1];
      const b = pixels[y][x][2];

      // Calculate the average applying an weight for each one, considering the human visual perception of each color
      const avg = r * 0.3 + g * 0.59 + b * 0.11;

      pixels[y][x] = avg
    }
  }

  return pixels
}

// This dithering function was made thanks to the "The Coding Train" video about Floyd-Steinberg Dithering (https://www.youtube.com/watch?v=0L2n8Tg2FwI)
function dithering() {
  for (let y = 0; y < pixels.length - 1; y++) {
    for (let x = 1; x < pixels[y].length - 1; x++) {

      const pixel = pixels[y][x];

      const factor = 4;

      const quant = round(factor * pixel / 255) * (255 / factor);

      pixels[y][x] = quant

      const quantErr = pixel - quant;

      let p;
      let newPixel;

      // --- 7/16
      p = pixels[y][x + 1];
      newPixel = p + quantErr * 7 / 16;

      pixels[y][x + 1] = newPixel;

      // --- 3/16
      p = pixels[y + 1][x - 1];
      newPixel = p + quantErr * 3 / 16;

      pixels[y + 1][x - 1] = newPixel;

      // --- 5/16
      p = pixels[y + 1][x];
      newPixel = p + quantErr * 5 / 16;

      pixels[y + 1][x] = newPixel

      // --- 1/16
      p = pixels[y + 1][x + 1];
      newPixel = p + quantErr * 1 / 16;

      pixels[y + 1][x + 1] = newPixel;
    }
  }

  return pixels;
}

// Applies the gameboy palette to the grayscale dithering image
function gbFilter() {

  const palette = gameboyPalette;

  for (let y = 0; y < pixels.length; y++) {
    for (let x = 0; x < pixels[y].length; x++) {

      const c = pixels[y][x] < 0 ? 0 : pixels[y][x] > 255 ? 255 : pixels[y][x];

      const newC = floor(map(c, 0, 255, 3, 0));
      
      pixels[y][x] = palette[newC];
    }
  }

  return pixels
}

// Convert the video stream pixel array to a two dimensional matrix containing the Red, Green, Blue values for each pixel
function videoToPixelArr() {

  // Made to crop the original image into a square
  const leftCrop = parseInt((video.width / 2) - video.height / 2);
  const rightCrop = parseInt((video.width / 2) + video.height / 2);

  for (let y = 0; y < video.height; y++) {
    pixels[y] = []
    for (let x = leftCrop; x < rightCrop; x++) {

      const pixelIndex = (x + y * video.width) * 4;

      // Get each color, the pixels property of the p5.js video stream is a one dimensional array like this [r,g,b,a,r,g,b,a...] this code rearange it in a matrix
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];

      pixels[y][x-leftCrop] = [r, g, b];
    }
  }

  return pixels;
}