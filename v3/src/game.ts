import { Color } from "./color";
import { Draw } from "./draw";

type DrawFactory = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: Color
) => Draw;

const backgroundFactory: DrawFactory = (ctx, width, height, color) => {
  const result: Draw = () => {
    ctx.fillStyle = color.background;
    ctx.fillRect(0, 0, width, height);
  };

  return result;
};

export const gameFactory: DrawFactory = (ctx, width, height, color) => {
  const background = backgroundFactory(ctx, width, height, color);

  const result: Draw = () => {
    background();
  };

  return result;
};
