class Env {
  static client(callback: () => void) {
    if (IsDuplicityVersion()) {
      return;
    }
    callback();
  }
  static server(callback: () => void) {
    if (!IsDuplicityVersion()) {
      return;
    }
    callback();
  }
};

export { Env };
