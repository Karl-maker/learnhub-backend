export default interface ILogger {
    info(message: string, info?: any) : void;
    debug(message: string, info?: any) : void;
    error(message: string, info?: any) : void;
    warn(message: string, info?: any) : void;
    fatal(message: string, info?: any) : void;
};
