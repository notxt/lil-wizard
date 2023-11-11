export type Color = {
  background: string;
  display: string;
  foreground: string;
  textPrimary: string;
  textSecondary: string;
};

// const light: Color = {
//   background: "white",
//   display: "grey",
//   foreground: "black",
// };

const dark: Color = {
  background: "black",
  display: "grey",
  foreground: "white",
  textPrimary: "hsl(0 0% 95%)",
  textSecondary: "hsl(0 0% 50%)",
};

type GetColor = () => Color;
export const getColor: GetColor = () => {
  let color: Color = dark;
  // if (
  //   window.matchMedia &&
  //   window.matchMedia("(prefers-color-scheme: light)").matches
  // ) {
  //   color = light;
  // }

  return color;
};
