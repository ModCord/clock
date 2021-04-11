import { Clock } from "../index";
const testClock = new Clock({ interval: 200 });

test("Clearing the interval", () => {
  expect(testClock._clearInterval()).toBeTruthy();
});

test("Has no interval", () => {
  expect(testClock._interval).toBeNull();
});

test("Setting up a different interval", () => {
  expect(testClock.setInterval(500)).toBeTruthy();
});

test("Adding a routine", () => {
  expect(testClock.schedule(Date.now() + 1000, { message: "The dog is cute." })).toStrictEqual({
    message: "The dog is cute.",
  });
});
