export const fetchNui = async <T = any>({
  name,
  module,
  payload,
}: {
  name: string;
  module: string;
  payload?: unknown[];
}): Promise<T> => {
  console.log(name);
  const result = await fetch('https://tsv/listener', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      module: module,
      payload: payload !== undefined ? payload : [],
    }),
  });

  return result.json();
};
