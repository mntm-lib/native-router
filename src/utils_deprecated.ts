// TODO: move to @mntm/shared

type Predicate<T> = (item: T) => boolean;

export const findIndex = <T>(arr: T[], predicate: Predicate<T>) => {
  return arr.findIndex(predicate);
};

export const findLastIndex = <T>(arr: T[], predicate: Predicate<T>) => {
  for (let i = arr.length; i--;) {
    if (predicate(arr[i])) {
      return i;
    }
  }
  return -1;
};

export const find = <T>(arr: T[], predicate: Predicate<T>) => {
  return arr.find(predicate);
};

export const findLast = <T>(arr: T[], predicate: Predicate<T>) => {
  const index = findLastIndex(arr, predicate);
  return index === -1 ? null : arr[index];
};

export const toBaseId = (num: number) => num.toString(32);
export const generateId = () => toBaseId(Math.random()) + toBaseId(Date.now());
