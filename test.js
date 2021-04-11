const Clock = require("./dist/lib/Clock").default;
const myClock = new Clock({ interval: 1000 });
console.time("is");
myClock.schedule(Date.now() + 5000, { hello: "world" });
console.timeEnd("is");

myClock.on("done", (data) => console.log(`Hello ${data.hello}.`));