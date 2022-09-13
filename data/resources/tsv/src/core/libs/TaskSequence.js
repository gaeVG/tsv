/* eslint-disable no-undef */
import { Ped } from './models/Ped';
export class TaskSequence {
  constructor(handle) {
    this.handle = 0;
    handle === undefined ? this.create() : (this.handle = handle);
    if (!TaskSequence.nullPed) {
      TaskSequence.nullPed = new Ped(0);
    }
    this.isClosed = false;
    this.count = 0;
  }
  create() {
    // Docs generate this as 'void' even though it returns a number
    this.handle = OpenSequenceTask(0);
  }
  dispose() {
    ClearSequenceTask(this.handle);
    this.handle = 0;
  }
  close(repeat = false) {
    if (this.isClosed) return;
    SetSequenceToRepeat(this.handle, repeat);
    CloseSequenceTask(this.handle);
    this.isClosed = true;
  }
  get Handle() {
    return this.handle;
  }
  get AddTask() {
    if (this.isClosed) {
      throw new Error("You can't add tasks to a closed sequence!");
    }
    this.count += 1;
    return TaskSequence.nullPed?.Task;
  }
  get IsClosed() {
    return this.isClosed;
  }
  get Count() {
    return this.count;
  }
}
