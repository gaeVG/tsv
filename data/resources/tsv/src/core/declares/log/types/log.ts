type LogData = {
  namespace: string;
  container: string;
  location?: string;
  message?: string;
  isChild?: boolean;
  isLast?: boolean;
  isModuleDisplay?: boolean;
};

export { LogData };
