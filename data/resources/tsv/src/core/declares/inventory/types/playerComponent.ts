type PlayerVariationType = {
  name: string;
};

type PlayerComponentType = {
  name: string;
  variations?: Array<{ name: string }>;
};

export { PlayerComponentType };
