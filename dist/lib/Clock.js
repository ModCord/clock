"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Clock extends events_1.EventEmitter {
    constructor(options) {
        super();
        this.interval = options.interval;
        this._routines = [];
        this._interval = null;
        var instantiated = this._instantiateInterval();
        if (instantiated !== true)
            throw new Error("Failed to instantiate the loop interval.");
    }
    schedule(endTimestamp, data) {
        const newRoutine = {
            end: endTimestamp,
            data: data
        };
        this._routines.push(newRoutine);
        this.emit("add", newRoutine);
    }
    _instantiateInterval() {
        this._interval = setInterval(() => {
            for (let index = 0; index < this._routines.length; index++) {
                const routine = this._routines[index];
                if (routine.end <= Date.now()) {
                    this.emit("done", routine.data);
                    this._routines.splice(index, 1);
                }
            }
        }, this.interval);
        return true;
    }
    _cleanInterval() {
        if (this._interval)
            clearInterval(this._interval);
        this._interval = null;
        return true;
    }
    setInterval(ms) {
        this._cleanInterval();
        this.interval = ms;
        this._instantiateInterval();
    }
}
exports.default = Clock;
