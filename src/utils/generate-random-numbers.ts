export function generateRandomNumbers({ amount, min, max }): number[] {
  const numbers: number[] = [];
  for (let i = 0; i < amount; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return numbers;
}
