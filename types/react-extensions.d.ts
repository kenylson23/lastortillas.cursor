// Extensões de tipos para React para resolver problemas com useState updater functions

import { Dispatch, SetStateAction } from 'react';

// Sobrescrever o tipo do useState para aceitar updater functions
declare module 'react' {
  interface SetStateAction<S> {
    (prevState: S): S;
  }
}

// Tipos específicos para resolver problemas de useState
export type StateUpdater<T> = Dispatch<SetStateAction<T>>;

// Helper type para updater functions
export type UpdaterFunction<T> = (prev: T) => T;

// Extensão para useState que aceita updater functions
export interface UseStateReturn<T> {
  0: T;
  1: StateUpdater<T>;
}

// Sobrescrever o tipo do useState
declare global {
  namespace React {
    function useState<T>(initialState: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void];
  }
} 