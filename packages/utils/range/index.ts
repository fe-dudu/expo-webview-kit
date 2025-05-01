export function range(start: number, end: number, step = 1): number[] {
  const result: number[] = [];

  if (step === 0) {
    return result;
  }

  const isAscending = step > 0;

  if (isAscending) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }

  return result;
}
