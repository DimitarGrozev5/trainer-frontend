export const getArr = <T>(size: number, contents: T): T[] => {
  if (size < 0) {
    throw new Error("size must be a positive number");
  }
  const a: T[] = [];
  for (let i = 0; i < size; i++) {
    a.push(contents);
  }
  return a;
};

export const addToArr = <T>(arr: T[], toSize: number, contents: T): T[] => {
  const dt = toSize - arr.length;
  if (dt < 0) {
    throw new Error("toSize must be greather than the size of the array");
  }
  const a = getArr(dt, contents);
  return [...arr, ...a];
};

// Function that copares two arrays and makes sure every element is equal between them
// Will fail if elements are objects
export const eqArr = <T>(a: T[], b: T[]): boolean => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};
