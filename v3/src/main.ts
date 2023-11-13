import { drawFactory } from "./draw.js";
import { move, moveFactory } from "./move.js";

const { floor } = Math;

const body = document.querySelector("body");
if (body === null) throw new Error("body is null");

const width = window.innerWidth;
const height = window.innerHeight;

const canvas = document.createElement("canvas");
canvas.setAttribute("width", width.toString());
canvas.setAttribute("height", height.toString());
body.appendChild(canvas);

const ctx = canvas.getContext("2d");
if (ctx === null) throw new Error("ctx is null");

const sprite = new Image();

export type Direction = "up" | "down" | "left" | "right";
type Move = Direction | null;

export type Hero = {
  x: number;
  y: number;
  spriteWidth: number;
  spriteHeight: number;
  width: number;
  height: number;
  direction: Direction;
  move: Move;
  moveSpeed: number;
  moveFrame: number;
  moveFrameSpeed: number;
};

const spriteWidth = 16;
const spriteHeight = 18;
const spriteScale = 2;

const hero: Hero = {
  x: floor(width / 2),
  y: floor(height / 2),
  spriteWidth,
  spriteHeight,
  width: spriteWidth * spriteScale,
  height: spriteHeight * spriteScale,
  direction: "right",
  move: null,
  moveSpeed: 2,
  moveFrame: 0,
  moveFrameSpeed: 8,
};

const codeUp = "ArrowUp";
const codeDown = "ArrowDown";
const codeLeft = "ArrowLeft";
const codeRight = "ArrowRight";
const directionCodes = [codeUp, codeDown, codeLeft, codeRight];

document.onkeydown = (event) => {
  const { code } = event;

  if (directionCodes.includes(code)) {
    if (code === codeUp) hero.direction = "up";
    if (code === codeDown) hero.direction = "down";
    if (code === codeLeft) hero.direction = "left";
    if (code === codeRight) hero.direction = "right";

    hero.move = hero.direction;
  }
};

document.onkeyup = (event) => {
  const { code } = event;

  if (code === "ArrowUp") hero.move = null;
  if (code === "ArrowDown") hero.move = null;
  if (code === "ArrowLeft") hero.move = null;
  if (code === "ArrowRight") hero.move = null;
};

const move = moveFactory(width, height);
const draw = drawFactory(ctx, width, height, sprite);

let frame = 0;
const loop: FrameRequestCallback = () => {
  move(hero);
  draw(frame, hero);
  frame++;

  window.requestAnimationFrame(loop);
};

const loaded = () => {
  window.requestAnimationFrame(loop);
};

sprite.onload = () => loaded();
sprite.src = "sprite.png";
