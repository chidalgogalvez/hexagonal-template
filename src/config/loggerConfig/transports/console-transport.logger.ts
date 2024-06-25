import { format, transports } from 'winston';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';

const { combine, colorize } = format;
const { Console } = transports;

const consoleTransportOptions: ConsoleTransportOptions = {
  level: 'debug',
  format: combine(colorize(), colorize({ all: true })),
};

const createConsoleTransport = (
  consoleTransportOptions: ConsoleTransportOptions
) => {
  return new Console(consoleTransportOptions);
};

export const consoleTransport = createConsoleTransport(consoleTransportOptions);
