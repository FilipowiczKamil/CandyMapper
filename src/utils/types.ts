// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtractReturn<T extends (...args: any[]) => any> = ReturnType<T>;
