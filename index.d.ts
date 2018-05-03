// TypeScript Version: 2.6

export namespace Tracer {
    interface LogOutput {
        timestamp: string;
        message: string;
        title: string;
        level: number;
        args: any[];
        method: string;
        path: string;
        line: string;
        pos: string;
        file: string;
        stack: string[];
        /* The output to be written */
        output: string;
    }

    type FilterFunction = (data: string) => string | void;
    type TransportFunction = (data: string) => void;

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
        format?: string;
        dateformat?: string;
        filters?: FilterFunction[];
        level?: string;
        methods?: string[];
        /* get the specified index of stack as file information. It is userful for development package. */
        stackIndex?: number;
        inspectOpt?: {
            /* if true then the object's non-enumerable properties will be shown too. Defaults to false */
            showHidden: boolean,
            /**
             * Tells inspect how many times to recurse while formatting the object.
             * This is useful for inspecting large complicated objects.
             * Defaults to 2. To make it recurse indefinitely pass null.
             */
            depth: number
        };

        /* Pre-process the log object. */
        preprocess?(data: LogOutput): void;
        /* Transport function (e.g. console.log) */
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

export function colorConsole(config?: Tracer.LoggerConfig): Tracer.Logger;
export function console(config?: Tracer.LoggerConfig): Tracer.Logger;
export function dailyfile(config?: Tracer.LoggerConfig): Tracer.Logger;

export function close(): void;
export function setLevel(level: number | string): void;
export function getLevel(): number | string;
