import { EventEmitter } from "events";

export interface Routine {
  end: number;
  data: any;
}
   
export interface ClockOptions {
  interval: number;
}

export interface ClockInterface {
  interval: number;
  _routines: Routine[];
  _interval: any; // Couldn't find any interval class?

  constructor (options: ClockOptions): void;
  schedule (endTimestamp: number, data: any): void;
  setInterval (ms: number): void;
  _instantiateInterval (): boolean;
  _cleanInterval (): boolean;
}

export default class Clock extends EventEmitter {
  public interval: number;
  public _routines: Routine[];
  public _interval: any;

  constructor (options: ClockOptions) {
    super();

    this.interval = options.interval;
    this._routines = [];
    this._interval = null;

    var instantiated = this._instantiateInterval();
    if (instantiated !== true) throw new Error("Failed to instantiate the loop interval.");
  }

  schedule (endTimestamp: number, data: any) {
    const newRoutine: Routine = {
      end: endTimestamp,
      data: data
    };
    this._routines.push(newRoutine);
    this.emit("add", newRoutine);
  }

  _instantiateInterval () {
    this._interval = setInterval(() => {
      for (let index: number = 0; index < this._routines.length; index++) {
        const routine: Routine = this._routines[index];
        if (routine.end <= Date.now()) {
          this.emit("done", routine.data);
          this._routines.splice(index, 1);
        }
      }
    }, this.interval);
    return true;
  }

  _cleanInterval () {
    if (this._interval) clearInterval(this._interval);
    this._interval = null;
    return true;
  }

  setInterval (ms: number) {
    this._cleanInterval();
    this.interval = ms;
    this._instantiateInterval();
  }
}