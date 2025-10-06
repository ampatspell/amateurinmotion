const fail = (value: unknown, message: string): never => {
  throw new Error(`${message} (${value})`);
};

export const asString = (arg: unknown): string => {
  if (typeof arg === 'string') {
    return arg as string;
  }
  return fail(arg, 'Not a string');
};

export const asOptionalString = (arg: unknown): string | undefined => {
  const type = typeof arg;
  if (type === 'string' || type === 'undefined' || arg === null) {
    if (arg === null) {
      arg = undefined;
    }
    return arg as string | undefined;
  }
  return fail(arg, 'Not an optional string');
};

export const asObjectArray = <T>(arg: T[] | string[] | null | undefined): T[] => {
  if (Array.isArray(arg)) {
    return arg as T[];
  }
  return fail(arg, 'Not an object array');
};

export const asObject = <T>(arg: T | string | null | undefined): T => {
  if (arg !== null && typeof arg === 'object') {
    return arg;
  }
  return fail(arg, 'Not an object');
};
