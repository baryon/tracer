// TypeScript Version: 2.6

export namespace Tracer {
    export interface LogOutput {
        /**
         * Current time.
         */
        timestamp: string;
        /**
         * The result of formating the template and arguments in `args`.
         */
        message: string;
        /**
         * Method name, default is `log`, `trace`, `debug`, `info`, `warn`, `error`, `fatal`.
         */
        title: string;
        /**
         * Method level, default is `log`: 0, `trace`: 1, `debug`: 2, `info`: 3, `warn`: 4, `error`: 5, `fatal`: 6.
         */
        level: number;
        /**
         * Arguments of `Logger` method.
         */
        args: any[];
        /**
         * Method name of caller.
         */
        method: string;
        /**
         * File's path.
         */
        path: string;
        /**
         * Line number.
         */
        line: string;
        /**
         * Position.
         */
        pos: string;
        /**
         * folder path.
         */
        folder: string;
        /**
         * File's name.
         */
        file: string;
        /**
         * Call stack message.
         */
        stack: string;
        /**
         * The output to be written
         */
        output: string;

        /**
         * Any custom keys
         */
        [key: string]: any;
    }

    export type LevelOption<T, M extends string> = Partial<Record<M, T>>
    export type FilterFunction = (data: string) => string | boolean | null | void;
    export type TransportFunction = (data: LogOutput) => void;

    export interface LoggerConfig<M extends string = "log" | "trace" | "debug" | "info" | "warn" | "error" | "fatal"> {
        /**
         * Output format (Using `tinytim` templating)
         *
         * Defaults to: `"{{timestamp}} <{{title}}> {{file}}:{{line}} ({{method}}) {{message}}"`
         *
         * Possible values:
         * - timestamp: current time
         * - title: method name, default is 'log', 'trace', 'debug', 'info', 'warn', 'error','fatal'
         * - level: method level, default is 'log':0, 'trace':1, 'debug':2, 'info':3, 'warn':4, 'error':5, 'fatal':6
         * - message: printf message, support %s string, %d number, %j JSON and auto inspect
         * - file: file name
         * - line: line number
         * - pos: position
         * - path: file's path
         * - method: method name of caller
         * - stack: call stack message
         */
        format?: string | [string, LevelOption<string, M>];
         /**
          * rootDir of folder path.
          */
        rootDir?: string;
        /**
         * Datetime format (Using `Date Format`)
         */
        dateformat?: string;
        filters?: FilterFunction[] | LevelOption<FilterFunction | FilterFunction[], M> | Array<FilterFunction | LevelOption<FilterFunction | FilterFunction[], M>>;
        /**
         * Output the log, if level of log larger than or equal to `level`.
         */
        level?: string | number;
        methods?: M[];
        /**
         * Get the specified index of stack as file information. It is useful for development package.
         */
        stackIndex?: number;
        inspectOpt?: {
            /**
             * If true then the object's non-enumerable properties will be shown too. Defaults to false.
             */
            showHidden: boolean,
            /**
             * Tells inspect how many times to recurse while formatting the object.
             * This is useful for inspecting large complicated objects.
             * Defaults to 2. To make it recurse indefinitely pass null.
             */
            depth: number | null
        };

        /**
         * Pre-process the log object.
         */
        preprocess?(data: LogOutput): void;
        /**
         * Transport function (e.g. console.log)
         */
        transport?: TransportFunction | TransportFunction[];
    }
    export interface DailyFileConfig {
        /**
         * All daily log file's dir, default to: `'.'`.
         */
        root?: string;
        /**
         * Log file path format.
         *
         * Default to: `'{{root}}/{{prefix}}.{{date}}.log'`
         *
         * Possible values:
         * - `root`: all daily log file's dir, default to: `'.'`.
         * - `prefix`: it equal to `allLogsFileName`, if `allLogsFileName` is provided; else it will be the method name.
         * - `date`: today's date.
         */
        logPathFormat?: string;
        /**
         * Datetime format (Using `Date Format`)
         */
        splitFormat?: string;
        /**
         * If `allLogsFileName` is provided then all level logs will be move to one daily log file.
         */
        allLogsFileName?: boolean | string;
        maxLogFiles?: number;
    }

    export type Logger<M extends string> = Record<M, (...args: any[]) => LogOutput>
}

/**
 * Create a console for printing color log.
 * @param [config] Configurate how logs are printed.
 */
export function colorConsole<M extends string>(config?: Tracer.LoggerConfig<M>): Tracer.Logger<M>;
/**
 * Create a console without color.
 * @param [config] Configurate how logs are printed.
 */
export function console<M extends string>(config?: Tracer.LoggerConfig<M>): Tracer.Logger<M>;
/**
 * DailyLog will output all types log to diff files every day like log4j.
 * @param config Configurate how logs are printed & how log files are saved.
 */
export function dailyfile<M extends string>(config?: Tracer.LoggerConfig<M> & Tracer.DailyFileConfig): Tracer.Logger<M>;

/**
 * End all the output.
 *
 * Equivalent to: `tracer.setLevel(Number.MAX_VALUE)`.
 */
export function close(): void;
/**
 * Change the log level in run time, for all the output.
 * 
 * Notice: If you set level in initialize, you can't change more lower level than the initial level.
 * @param level Output the log, if level of log larger than or equal to `level`.
 */
export function setLevel(level: number | string): void;
/**
 * Get the current log level.
 */
export function getLevel(): number | string;
