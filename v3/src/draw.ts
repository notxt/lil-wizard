import { Hero } from "./main";

type DrawHero = (frame: number, hero: Hero) => void;
type DrawHeroFactory = (
  ctx: CanvasRenderingContext2D,
  sprite: HTMLImageElement
) => DrawHero;

const drawHeroFactory: DrawHeroFactory = (ctx, sprite) => {
  const standY = 45;
  const moveFrame1 = 22;
  const moveFrame2 = 70;
  const moveFrames = [moveFrame1, moveFrame2];
  const result: DrawHero = (frame, hero) => {
    let spriteX = 0;
    if (hero.direction === "right") spriteX = hero.spriteWidth * 2;
    if (hero.direction === "down") spriteX = hero.spriteWidth * 4;
    if (hero.direction === "left") spriteX = hero.spriteWidth * 6;

    let spriteY = standY;
    if (hero.move !== null) {
      const moveFrame = moveFrames[hero.moveFrame];
      if (typeof moveFrame === "undefined")
        throw new Error(`no move frame for index ${hero.moveFrame}`);

      spriteY = moveFrame;
      if (frame % hero.moveFrameSpeed === 0)
        hero.moveFrame = (hero.moveFrame + 1) % moveFrames.length;
    }

    ctx.drawImage(
      sprite,
      spriteX,
      spriteY,
      hero.spriteWidth,
      hero.spriteHeight,
      hero.x,
      hero.y,
      hero.width,
      hero.height
    );
  };

  return result;
};

type Draw = (frame: number, hero: Hero) => void;

type DrawFactory = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  sprite: HTMLImageElement
) => Draw;

export const drawFactory: DrawFactory = (ctx, width, height, sprite) => {
  const drawHero = drawHeroFactory(ctx, sprite);

  const result: Draw = (frame, hero) => {
    ctx.clearRect(0, 0, width, height);
    drawHero(frame, hero);
  };

  return result;
};
