import { getColor } from "./color.js";
import { Draw } from "./draw.js";
import { gameFactory } from "./game.js";
// import { titleScreenFactory } from "./title.js";

const { floor } = Math;

// load assets
const sprite = new Image();

sprite.src = "asset/sprite.png";

const body = document.querySelector("body");
if (body === null) throw new Error("body is null");

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const windowAspectRatio = windowWidth / windowHeight;
const displayAspectRatio = 16 / 9;

let height = windowHeight;
let width = floor(height * displayAspectRatio);
if (displayAspectRatio > windowAspectRatio) {
  width = windowWidth;
  height = floor(width / displayAspectRatio);
}

const canvas = document.createElement("canvas");
canvas.setAttribute("width", width.toString());
canvas.setAttribute("height", height.toString());
body.appendChild(canvas);

const ctx = canvas.getContext("2d");
if (ctx === null) throw new Error("ctx is null");

const color = getColor();

// const titleScreen = titleScreenFactory(ctx, width, height, color);
const game = gameFactory(ctx, width, height, color);

const progression: [Draw] = [game];
let progressionIndex: 0 = 0;

const loop: FrameRequestCallback = () => {
  const current = progression[progressionIndex];
  current();

  window.requestAnimationFrame(loop);
};

window.requestAnimationFrame(loop);
