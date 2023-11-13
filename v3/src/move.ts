import { Hero } from "./main";

type Move = (hero: Hero) => void;
type MoveFactory = (width: number, height: number) => Move;

export const moveFactory: MoveFactory = (width, height) => {
  const result: Move = (hero) => {
    if (hero.move === null) return;
    if (hero.move === "down") hero.y += hero.moveSpeed;
    if (hero.move === "left") hero.x -= hero.moveSpeed;
    if (hero.move === "right") hero.x += hero.moveSpeed;
    if (hero.move === "up") hero.y -= hero.moveSpeed;

    if (hero.x < 0) hero.x = 0;
    if (hero.x > width - hero.width) hero.x = width - hero.width;
    if (hero.y < 0) hero.y = 0;
    if (hero.y > height - hero.height) hero.y = height - hero.height;
  };

  return result;
};
