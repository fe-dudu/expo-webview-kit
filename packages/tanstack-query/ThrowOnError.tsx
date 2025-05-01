interface Props {
  error: Error | null;
  isFetching: boolean;
  children: React.ReactNode;
}

/**
 * @example
 * ```tsx
 * import { useSuspenseQuery } from "@tanstack/react-query";
 *
 * function Page() {
 *   const { data, error, isFetching } = useSuspenseQuery({
 *     queryKey: ["example"],
 *     queryFn: fetchExampleData,
 *   });
 *
 *   return <div>{data.content}</div>;
 * }
 *
 * function App() {
 *   const { error, isFetching } = useSuspenseQuery({
 *     queryKey: ["example"],
 *     queryFn: fetchExampleData,
 *   });
 *
 *   return (
 *     <ThrowOnError error={error} isFetching={isFetching}>
 *       <Page />
 *     </ThrowOnError>
 *   );
 * }
 * ```
 */

export function ThrowOnError({ error, isFetching, children }: Props) {
  if (error && !isFetching) {
    throw error;
  }

  return children;
}
