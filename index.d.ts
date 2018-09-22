// TypeScript Version: 2.6

export namespace Tracer {
    interface LogOutput {
        /**
         * Current time.
         */
        timestamp: string;
        message: string;
        /**
         * Method name, default is `log`, `trace`, `debug`, `info`, `warn`, `error`, `fatal`.
         */
        title: string;
        /**
         * Method level, default is `log`: 0, `trace`: 1, `debug`: 2, `info`: 3, `warn`: 4, `error`: 5, `fatal`: 6.
         */
        level: number;
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
         * File's name.
         */
        file: string;
        /**
         * Call stack message.
         */
        stack: string[];
        /**
         * The output to be written
         */
        output: string;
    }

    type LevelOption<T> = { log: T, trace: T, debug: T, info: T, warn: T, error: T, fatal: T };
    type FilterFunction = (data: string) => string | void;
    type TransportFunction = (data: LogOutput) => void;

    interface LoggerConfig {
        /**
         * Output format (Using `tinytim` templating)
         *
         * Defaults to: "{{timestamp}} <{{title}}> {{file}}:{{line}} ({{method}}) {{message}}"
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
        format?: string | [string, LevelOption<string>];
        /**
         * Datetime format (Using `Date Format`)
         */
        dateformat?: string;
        filters?: FilterFunction[] | LevelOption<FilterFunction> | (FilterFunction | LevelOption<FilterFunction>)[];
        level?: string | number;
        methods?: string[];
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
            depth: number
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

    interface Logger {
        log(...args: any[]): LogOutput;
        trace(...args: any[]): LogOutput;
        debug(...args: any[]): LogOutput;
        info(...args: any[]): LogOutput;
        warn(...args: any[]): LogOutput;
        error(...args: any[]): LogOutput;
        fatal(...args: any[]): LogOutput;
    }
}

/**
 * Create a console for printing color log.
 * @param {Tracer.LoggerConfig} [config] Configurate how is log print.
 */
export function colorConsole(config?: Tracer.LoggerConfig): Tracer.Logger;
/**
 * Create a console without color.
 * @param {Tracer.LoggerConfig} [config] Configurate how is log print.
 */
export function console(config?: Tracer.LoggerConfig): Tracer.Logger;
export function dailyfile(config?: Tracer.LoggerConfig): Tracer.Logger;

/**
 * End all the output.
 * 
 * Equivalent to: `tracer.setLevel(Number.MAX_VALUE)`
 */
export function close(): void;
/**
 * Change the log level in run time, for all the output.
 * @param {(number | string)} level
 */
export function setLevel(level: number | string): void;
/**
 * Get the current log level.
 */
export function getLevel(): number | string;
