import { FastAverageColor } from "fast-average-color";

const fac = new FastAverageColor();

export async function getColorAverage(
  imageUrl: string
): Promise<string | null> {
  return (await fac
    .getColorAsync(imageUrl))
    .hex;
}