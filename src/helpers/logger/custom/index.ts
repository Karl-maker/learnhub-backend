import ILogger from "../interface";

export default class CustomLogger implements ILogger {
    info(message: string, info: any = ''): void {
        console.log(displayMessage('INFO', message), info);
    }
    debug(message: string, info: any = ''): void {
        console.log(displayMessage('DEBUG', message), info);
    }
    error(message: string, info: any = ''): void {
        console.error(displayMessage('ERROR', message), info);
    }
    warn(message: string, info: any = ''): void {
        console.warn(displayMessage('WARN', message), info);
    }
    fatal(message: string, info: any = ''): void {
        console.error(displayMessage('FATAL', message), info);
    }
    
}

function displayMessage(type: 'ERROR' | 'INFO' | 'DEBUG' | 'WARN' | 'FATAL', msg: string) {
    return `${type}: ${Date()} - ${msg}`
}