import { LoggerOptions, Logger as LoggerWinston, createLogger } from 'winston';
import { baseLoggerOptions } from './baseLoggerOptions';
import { consoleTransport } from './transports/console-transport.logger';

export class AppLogger {
  private static instance: AppLogger; // Instancia singleton
  private _logger: LoggerWinston;

  // Constructor privado para implementar el patrón singleton
  private constructor(loggerOptions?: LoggerOptions) {
    this._logger = createLogger(loggerOptions);
  }

  // Método estático para obtener la instancia del logger
  public static getInstance(loggerOptions?: LoggerOptions): AppLogger {
    if (!AppLogger.instance) {
      AppLogger.instance = new AppLogger(loggerOptions);
    }
    return AppLogger.instance;
  }

  // Métodos de registro del logger
  public info(message: any, ...args: any[]) {
    this._logger.info(message, ...args);
  }

  public error(message: any, ...args: any[]) {
    this._logger.error(message, ...args);
  }

  public debug(message: any, ...args: any[]) {
    this._logger.debug(message, ...args);
  }

  public warn(message: any, ...args: any[]) {
    this._logger.warn(message, args);
  }
}

// Aquí instanciamos AppLogger con opciones específicas y exportamos la instancia como Logger

export const Logger = AppLogger.getInstance({
  ...baseLoggerOptions,
  transports: [consoleTransport],
});
