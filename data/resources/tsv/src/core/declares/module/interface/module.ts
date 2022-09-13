interface IModule {
  name: string;
  running?: boolean;
  init(...args: []): Error;
}

export { IModule };
