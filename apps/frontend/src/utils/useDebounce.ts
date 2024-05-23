export const useDebounce = (callback: any, delay: number) => {
  let timeOutId: any = null;
  return function (...arg: any) {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      callback(...arg);
    }, delay);
  };
};
