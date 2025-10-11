export function isTruthy<T>(value?: T | undefined | null | false): value is T {
  return !!value;
}

export function nextObject<T>(array: readonly T[], item: T, wrap: boolean = false) {
  const idx = array.indexOf(item);
  if (idx === -1) {
    return;
  } else if (wrap && idx === array.length - 1) {
    return array[0];
  }
  return array[idx + 1];
}

export const prevObject = <T>(array: readonly T[], object: T, wrap: boolean = false) => {
  const idx = array.indexOf(object);
  if (idx === -1) {
    return;
  }
  if (idx === 0) {
    if (wrap) {
      return lastObject(array);
    }
    return;
  }
  return array[idx - 1];
};

export function lastObject<T>(arr: readonly T[]): T | undefined {
  return arr[arr.length - 1];
}
