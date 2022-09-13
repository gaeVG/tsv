import { Tasks } from './Tasks';
export declare class TaskSequence {
  private static nullPed;
  private handle;
  private isClosed;
  private count;
  constructor(handle?: number);
  private create;
  dispose(): void;
  close(repeat?: boolean): void;
  get Handle(): number;
  get AddTask(): Tasks | null | undefined;
  get IsClosed(): boolean;
  get Count(): number;
}
