import { Color } from "./color";
import { Draw } from "./draw";

const { floor } = Math;

type DrawFactory = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: Color
) => Draw;

const family = "monospace";

type FontFactory = (size: number) => string;
const fontFactory: FontFactory = (size) => `${size}px ${family}`;

type TitleFactory = (
  ctx: CanvasRenderingContext2D,
  text: string,
  size: number,
  color: Color
) => Draw;
const titleFactory: TitleFactory = (ctx, text, size, color) => {
  const font = fontFactory(size);

  const result: Draw = () => {
    ctx.fillStyle = color.textPrimary;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(text, 0, 0);
  };

  return result;
};

type InstructionFactory = (
  ctx: CanvasRenderingContext2D,
  text: string,
  size: number,
  color: Color
) => Draw;
const instructionFactory: InstructionFactory = (
  ctx,
  text,
  size,
  color
): Draw => {
  const font = fontFactory(size);

  const result: Draw = () => {
    ctx.fillStyle = color.textSecondary;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(text, 0, 0);
  };

  return result;
};

export const titleScreenFactory: DrawFactory = (ctx, width, height, color) => {
  const x = floor(width / 2);

  const titleOffset = floor(height / 3);
  const titleText = "LIL' WIZ";
  const titleSize = floor(width / titleText.length);
  const title = titleFactory(ctx, titleText, titleSize, color);

  const instructionOffset = titleSize + floor(height / 20);
  const instructionText = "Press any key to continue";
  const instructionSize = floor(width / instructionText.length);
  const instruction = instructionFactory(
    ctx,
    instructionText,
    instructionSize,
    color
  );

  const result: Draw = () => {
    ctx.save();
    ctx.translate(x, 0);
    ctx.translate(0, titleOffset);
    title();
    ctx.translate(0, instructionOffset);
    instruction();
    ctx.restore();
  };

  return result;
};
