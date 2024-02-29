import analyze from 'rgbaster'

export async function getColorSampling (imageUrl: string | null) {
  const raw = await analyze(imageUrl);
  const convertedRaw = raw[0].color;

  const converted: number[] = convertedRaw.match(/\d+/g)!.map(Number);
  const output: string = "#" + converted.map(value => {
    const outputValue: string = value.toString(16);

    return outputValue.length === 1 ? '0' + outputValue : outputValue }).join('');

  return {
    output
  }
}