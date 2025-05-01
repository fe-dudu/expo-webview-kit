declare global {
  interface Window {
    refreshTokenPromise: Promise<string> | null;
  }
}

export {};
