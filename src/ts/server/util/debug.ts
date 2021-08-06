import debug, { IDebugger } from 'debug';
export type { IDebugger as ILogger };

export const getLogger = (namespace: string = null): IDebugger => {
  if (!namespace) {
    return debug('*');
  }

  if (namespace.endsWith(':*')) {
    return debug(namespace);
  }

  return debug(`${namespace}:*`);
};