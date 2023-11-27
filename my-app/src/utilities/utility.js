import chroma from "chroma-js";

export function generateRandomColor() {
  let color;
  do {
    // Generate a random color
    color = chroma.random();
  } while (!chroma.contrast(color, "white") >= 4.5); // Ensure sufficient contrast with white (you can change this value as needed)

  return color.hex();
}
