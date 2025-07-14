interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  context?: any;
  userId?: string;
}

class Logger {
  private isProduction = process.env.NODE_ENV === 'production';

  private formatLog(entry: LogEntry): string {
    const { timestamp, level, message, context, userId } = entry;
    const logData = {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...(userId && { userId }),
      ...(context && { context })
    };
    
    return JSON.stringify(logData);
  }

  info(message: string, context?: any, userId?: string) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      context,
      userId
    };
    
    if (this.isProduction) {
      console.log(this.formatLog(entry));
    } else {
      console.log(`INFO: ${message}`, context ? context : '');
    }
  }

  warn(message: string, context?: any, userId?: string) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'warn',
      message,
      context,
      userId
    };
    
    console.warn(this.formatLog(entry));
  }

  error(message: string, error?: Error | any, userId?: string) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      context: error ? {
        message: error.message,
        stack: error.stack,
        ...(error.cause && { cause: error.cause })
      } : undefined,
      userId
    };
    
    console.error(this.formatLog(entry));
  }

  debug(message: string, context?: any, userId?: string) {
    if (!this.isProduction) {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: 'debug',
        message,
        context,
        userId
      };
      
      console.debug(`DEBUG: ${message}`, context ? context : '');
    }
  }
}

export const logger = new Logger();
