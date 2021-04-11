import { EventEmitter } from "events";

export interface Routine {
  end: number;
  data?: any;
}

export interface ClockOptions {
  interval: number;
}

export interface ClockInterface {
  interval: number;
  _routines: Routine[];
  _interval?: any;

  schedule(endTimestamp: number, data: any): any;
  setInterval(interval: number): boolean;
  _instantiateInterval(): boolean;
  _clearInterval(): boolean;
}

export class Clock extends EventEmitter implements ClockInterface {
  interval: number;
  _routines: Routine[];
  _interval?: any;

  constructor(options: ClockOptions) {
    super();

    this.interval = options.interval;
    this._routines = [];

    const instantiated = this._instantiateInterval();
    if (!instantiated) throw new Error("Failed to instantiate the clock's internal interval.");
  }

  _instantiateInterval() {
    this._interval = setInterval(() => {
      for (let index: number = 0; index < this._routines.length; index++) {
        const routine: Routine = this._routines[index];
        if (routine.end <= Date.now()) {
          this.emit("end", routine.data);
          this._routines.splice(index, 1);
        }
      }
    }, this.interval);
    return true;
  }

  _clearInterval() {
    if (this._interval) clearInterval(this._interval);
    this._interval = null;
    return true;
  }

  setInterval(interval: number): boolean {
    this._clearInterval();
    this.interval = interval;
    const instantiated = this._instantiateInterval();
    if (!instantiated) return false;
    return true;
  }

  schedule(endTimestamp: number, data: any) {
    const newRoutine: Routine = {
      end: endTimestamp,
      data,
    };
    this._routines.push(newRoutine);
    this.emit("start", newRoutine);
    return data;
  }
}
