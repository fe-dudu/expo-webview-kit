export function numberFormat(val?: number | null, options?: Intl.NumberFormatOptions) {
  const nf = new Intl.NumberFormat('en', options);
  if (val === null || val === undefined) {
    return val;
  }
  return nf.format(val);
}
