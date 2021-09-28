// Polyfill because svelte does not export these types
// -> https://github.com/sveltejs/svelte/issues/5169
export type Subscriber<T> = (value: T) => void;
export type Unsubscriber = () => void;
export type Updater<T> = (value: T) => T;
export type Invalidator<T> = (value?: T) => void;