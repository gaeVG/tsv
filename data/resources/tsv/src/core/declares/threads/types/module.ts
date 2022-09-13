type ThreadModule = {
  name: string;
  timer?: number;
  isDUIThread?: boolean;
  callback: (identifier: string, name: string, timer: number) => boolean;
};

export { ThreadModule };
