function joaat(key: string): number {
  let hash = 0;
  for (let i = 0, length = key.length; i < length; i++) {
    hash += key.charCodeAt(i);
    hash += hash << 10;
    hash ^= hash >>> 6;
  }
  hash += hash << 3;
  hash ^= hash >>> 11;
  hash += hash << 15;

  return hash;
}

export { joaat };
