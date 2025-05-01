interface Props {
  isEmpty: boolean;
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export function EmptyCase({ isEmpty, fallback, children }: Props) {
  if (isEmpty) {
    return fallback;
  }

  return children;
}
