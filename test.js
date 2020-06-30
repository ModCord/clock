const { Clock } = require("./index.js");
const myClock = new Clock({ interval: 200 });

myClock.on("done", (data) => {
  console.log(data);
});

myClock.schedule(Date.now() + 2000, "Waited ~2 seconds.");
