/// <reference types="node" />
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
    _interval: any;
    constructor(options: ClockOptions): void;
    schedule(endTimestamp: number, data: any): void;
    setInterval(ms: number): void;
    _instantiateInterval(): boolean;
    _cleanInterval(): boolean;
}
export default class Clock extends EventEmitter {
    interval: number;
    _routines: Routine[];
    _interval: any;
    constructor(options: ClockOptions);
    schedule(endTimestamp: number, data: any): void;
    _instantiateInterval(): boolean;
    _cleanInterval(): boolean;
    setInterval(ms: number): void;
}
