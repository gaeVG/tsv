class Benchmark {
  start: number;

  constructor() {
    this.start = GetGameTimer();
  }

  grab(): number {
    return GetGameTimer() - this.start;
  }
}

export { Benchmark };
