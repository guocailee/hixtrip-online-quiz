function delay<T>(data: T, time: number = 100): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), time)
  })
}

// 防抖函数
function debounce(func: Function, delay: number) {
  let timeoutId: any = null;

  return function(...args: any) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export {
  delay,
  debounce
}
