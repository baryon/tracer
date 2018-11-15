import * as tracer from "tracer";
import * as colors from "colors";

let logger: tracer.Tracer.Logger;

logger = tracer.console();

logger.log("hello");
logger.trace("hello", "world");
logger.debug("hello %s", "world", 123);
logger.info("hello %s %d", "world", 123, { foo: "bar" });
logger.warn("hello %s %d %j", "world", 123, { foo: "bar" });
logger.error(
  "hello %s %d %j",
  "world",
  123,
  { foo: "bar" },
  [1, 2, 3, 4],
  Object
);

logger = tracer.colorConsole();

logger.log("hello");
logger.trace("hello", "world");
logger.debug("hello %s", "world", 123);
logger.info("hello %s %d", "world", 123, { foo: "bar" });
logger.warn("hello %s %d %j", "world", 123, { foo: "bar" });
logger.error(
  "hello %s %d %j",
  "world",
  123,
  { foo: "bar" },
  [1, 2, 3, 4],
  Object
);

logger = tracer.dailyfile({
  root: ".",
  maxLogFiles: 10,
  allLogsFileName: "myAppName"
});

logger.log("hello");
logger.trace("hello", "world");
logger.debug("hello %s", "world", 123);
logger.info("hello %s %d", "world", 123, { foo: "bar" });
logger.warn("hello %s %d %j", "world", 123, { foo: "bar" });
logger.error(
  "hello %s %d %j",
  "world",
  123,
  { foo: "bar" },
  [1, 2, 3, 4],
  Object
);

logger = tracer.console({ level: "warn" });

logger.log("hello");
logger.trace("hello", "world");
logger.debug("hello %s", "world", 123);
logger.info("hello %s %d", "world", 123, { foo: "bar" });
logger.warn("hello %s %d %j", "world", 123, { foo: "bar" });
logger.error(
  "hello %s %d %j",
  "world",
  123,
  { foo: "bar" },
  [1, 2, 3, 4],
  Object
);

logger = tracer.colorConsole({
  format: [
    "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})", // default format
    {
      error:
        "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format
    }
  ],
  dateformat: "HH:MM:ss.L",
  preprocess(data) {
    data.title = data.title.toUpperCase();
  }
});

logger = tracer.colorConsole({
  level: "log1",
  methods: ["log0", "log1", "log2", "log3", "log4", "log5"],
  filters: [colors.underline, colors.yellow]
});

logger.log0("hello");
logger.log1("hello", "world");
logger.log2("hello %s", "world", 123);
logger.log4("hello %s %d", "world", 123);
logger.log5("hello %s %d", "world", 123);
