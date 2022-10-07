// eslint-disable-next-line @typescript-eslint/ban-types
function debounce(func: Function, timeout = 300) {
  let timer: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export default debounce;
