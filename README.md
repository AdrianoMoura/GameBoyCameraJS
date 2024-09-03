# GameBoyCameraJS

This is a simple project that emulate the GameBoy Camera aesthetic using JavaScript, p5.js, and your webcam. It applies the Floyd-Steinberg dithering algorithm to achieve the pixelated style similar of the GameBoy.

![Sample](https://github.com/AdrianoMoura/GameBoyCameraJS/blob/master/grogu.png?raw=true)

## Features

- **Webcam Integration:** Captures live video feed from your webcam and applies the GameBoy Camera aesthetic in real-time.
- **Dithering Effect:** Implements the Floyd-Steinberg Dithering algorithm to simulate the pixelated, monochrome look.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, etc.) with webcam access.
- [p5.js](https://p5js.org/) (included in the project)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/AdrianoMoura/GameBoyCameraJS
    ```
3. Open the `index.html` file in your web browser. Make sure to allow access to your webcam when prompted.

## Usage

- Open the `index.html` file in your browser to start the webcam feed.
- The live video feed from your webcam will be processed to emulate the GameBoy Camera aesthetic.

## How It Works

This project uses p5.js to capture live video from your webcam and display it on the canvas. The Floyd-Steinberg Dithering algorithm is applied in real-time to create the characteristic look of the GameBoy Camera. The algorithm works by distributing quantization error across neighboring pixels, producing a dithering effect.

## Contributing

If you have suggestions for improvement or find any issues, feel free to open an issue or submit a pull request. Contributions are welcome!

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by The Coding Train - Coding Challenge #90: Floyd-Steinberg Dithering (https://www.youtube.com/watch?v=0L2n8Tg2FwI) 🚂
