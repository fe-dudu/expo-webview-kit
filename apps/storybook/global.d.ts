interface CSSModule {
  /**
   * Returns the specific selector from imported stylesheet as string.
   */
  [key: string]: string;
}

declare module '*.css' {
  /**
   * A CSS module.
   */
  const styles: CSSModule;
  export default styles;
}
