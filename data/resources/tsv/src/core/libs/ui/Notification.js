export class Notification {
  constructor(handle) {
    this.handle = handle;
  }
  hide() {
    // eslint-disable-next-line no-undef
    RemoveNotification(this.handle);
  }
}
