import { format, LoggerOptions } from 'winston';
import { AbstractConfigSet } from 'winston/lib/winston/config';

const { combine, timestamp, errors, label, printf, prettyPrint, metadata } =
  format;

const myCustomLevels: AbstractConfigSet = {
  levels: {
    debug: 3,
    info: 2,
    warn: 1,
    error: 0,
  },
  colors: {
    info: 'green',
    warn: 'yellow',
    error: 'red',
    debug: 'blue',
  },
};

export const baseLoggerOptions: LoggerOptions = {
  levels: myCustomLevels.levels,
  format: combine(
    combine(
      label({ label: 'LOG' }),
      errors({ stack: true }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      prettyPrint(),
      printf(({ label, timestamp, level, message }) => {
        return `[${label}] [${timestamp}] [${level.toUpperCase()}] : ${
          message ? message : 'ERROR'
        }`;
      }),
      metadata()
    )
  ),
};
