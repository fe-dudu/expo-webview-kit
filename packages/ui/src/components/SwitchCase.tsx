interface Props<T extends string> {
  value: T;
  caseBy: Record<T, React.ReactNode>;
  DefaultComponent?: React.ReactNode;
}

export function SwitchCase<T extends string>({ value, caseBy, DefaultComponent }: Props<T>) {
  return caseBy[value] || DefaultComponent || null;
}
