export class Notification {
  private handle: number;

  constructor(handle: number) {
    this.handle = handle;
  }

  public hide(): void {
    global.RemoveNotification(this.handle);
  }
}
